import './OrderSlip.scss';
import React, { useEffect, useState } from 'react';
import {
  IconButton,
  Button,
  Divider,
  InputBase,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { jaJP as jaJP1 } from '@mui/x-date-pickers/locales';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  jaJP
} from '@mui/x-data-grid';
import {
  randomId,
} from '@mui/x-data-grid-generator';
import axiosApi from '../../utilities/axios';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getSlipList } from '../../store/slip/orderSlipReducer';

const StyledIconButton = styled(IconButton)({
  border: '1px solid black',
  borderRadius: '0%',
});

const NonBorderRadiusButton = styled(Button)({
  borderRadius: '0%',
  color: '#000000',
  '&:hover': {
    color: '#222422'
  }
});

const roles = ['Market', 'Finance', 'Development'];

const initialRows: GridRowsProp = [
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'productCode' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        明細登録
      </Button>
    </GridToolbarContainer>
  );
}

export interface OrderSlipCommon {
  No: string | null;
  slipDate: Dayjs | null;
  deliveryDate: Dayjs | null;
  shoppingDate: Dayjs | null;
  deliveryPlaceCode: string;
  storehouseCode: string;
  globalRate: string;
  chargerCode: string;
  receiverCode: string;
  exhibitionCode: string;
  status: string;
}

export interface BtnStatusInterface {
  first: 'active' | 'disable';
  prev: 'active' | 'disable';
  next: 'active' | 'disable';
  last: 'active' | 'disable';
  delete: 'active' | 'disable';
  cancel: 'active' | 'disable';
  save: 'active' | 'disable';
}

const OrderSlip = () => {
  const dispatch = useAppDispatch();
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [slipCommon, setSlipCommon] = useState<OrderSlipCommon>({
    No: "",
    slipDate: dayjs('2022-01-01'),
    deliveryDate: dayjs('2022-01-01'),
    shoppingDate: dayjs('2022-01-01'),
    deliveryPlaceCode: "",
    storehouseCode: "",
    globalRate: "100.0%",
    chargerCode: "",
    receiverCode: "",
    exhibitionCode: "",
    status: "発注済み",
  });
  const noList: string[]  = useAppSelector((state) => {
    const ret = state.orderSlip.slips.map(slip => slip.no ?? "");
    return ["新規登録", ...ret];
  });
  const [btnStatus, setBtnStatus] = useState<BtnStatusInterface>({
    first: 'disable',
    prev: 'disable',
    next: 'disable',
    last: 'disable',
    delete: 'disable',
    cancel: 'disable',
    save: 'disable',
  });

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSlipCommon({...slipCommon, status: (event.target as HTMLInputElement).value});
  };

  const handleNoChange = (event: any, newValue: string | null) => {
    btnStatus.first = ((newValue === "新規登録" || newValue === noList[noList.length - 1]) ? 'disable' : 'active');
    btnStatus.prev = ((newValue === "新規登録" || newValue === noList[noList.length - 1]) ? 'disable' : 'active');
    btnStatus.next = ((newValue === "新規登録" || newValue === noList[1]) ? 'disable' : 'active');
    btnStatus.last = ((newValue === "新規登録" || newValue === noList[1]) ? 'disable' : 'active');
    btnStatus.delete = (newValue === "新規登録" ? 'disable' : 'active');
    btnStatus.cancel = 'disable';
    btnStatus.save = 'disable';
    setSlipCommon({...slipCommon, No: newValue});
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: 'productCode',
      headerName: '商品コード ',
      minWidth: 100,
      align: 'left',
      headerAlign: 'left',
      editable: true
    },
    {
      field: 'productName',
      headerName: '商品名',
      minWidth: 150,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'ProductPartnumber',
      headerName: '仮品番',
      minWidth: 100,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'size',
      headerName: 'サイズ',
      minWidth: 100,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'color',
      headerName: '色',
      minWidth: 100,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'quantity',
      headerName: '数量',
      minWidth: 120,
      align: 'right',
      headerAlign: 'left',
      editable: true,
      type: 'number',
    },
    {
      field: 'unit',
      headerName: '単位',
      minWidth: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'maxCost',
      headerName: '上代単価',
      minWidth: 120,
      align: 'right',
      headerAlign: 'left',
      type: 'number',
      editable: true,
    },
    {
      field: 'rate',
      headerName: '掛率',
      minWidth: 120,
      align: 'right',
      headerAlign: 'left',
      type: 'number',
      editable: true,
    },
    {
      field: 'maxPrice',
      headerName: '上代金額',
      minWidth: 120,
      align: 'right',
      headerAlign: 'left',
      type: 'number',
      editable: true,
    },
    {
      field: 'minCost',
      headerName: '下代単価 ',
      minWidth: 120,
      align: 'right',
      headerAlign: 'left',
      type: 'number',
      editable: true,
    },
    {
      field: 'cost',
      headerName: '原単価 ',
      minWidth: 120,
      align: 'right',
      headerAlign: 'left',
      type: 'number',
      editable: true,
    },
    {
      field: 'minPrice',
      headerName: '下代金額 ',
      minWidth: 120,
      align: 'right',
      headerAlign: 'left',
      type: 'number',
      editable: true,
    },
    {
      field: 'price',
      headerName: '原価金額  ',
      minWidth: 120,
      align: 'right',
      headerAlign: 'left',
      type: 'number',
      editable: true,
    },
    {
      field: 'profit',
      headerName: '粗利金額 ',
      minWidth: 120,
      align: 'right',
      headerAlign: 'left',
      type: 'number',
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      minWidth: 120,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const CustomFooter = () => {
    const selectedRows = [...rows];
    const quantitySum = selectedRows.reduce((sum: number, row: any) => sum + (row.quantity || 0), 0);
    const maxPriceSum = selectedRows.reduce((sum: number, row: any) => sum + (row.maxPrice || 0), 0);
    const minPriceSum = selectedRows.reduce((sum: number, row: any) => sum + (row.minPrice || 0), 0);
    const profitSum = selectedRows.reduce((sum: number, row: any) => sum + (row.profit || 0), 0);

    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          
        </div>
        <div>
          合計数量: {quantitySum.toFixed(2)}
        </div>
        <div>
          合計上代: {maxPriceSum.toFixed(2)}
        </div>
        <div>
          合計金額: {minPriceSum.toFixed(2)}
        </div>
        <div>
          粗利金額: {profitSum.toFixed(2)}
        </div>
      </div>
    );
  }

  const handleCancel = () => {
    setSlipCommon({
      No: "新規登録",
      slipDate: dayjs('2022-01-01'),
      deliveryDate: dayjs('2022-01-01'),
      shoppingDate: dayjs('2022-01-01'),
      deliveryPlaceCode: "",
      storehouseCode: "",
      globalRate: "100.0",
      chargerCode: "",
      receiverCode: "",
      exhibitionCode: "",
      status: "発注済み",
    });
  }

  const handleSave = () => {
    axiosApi
      .post('slip/order_slip/', { common: slipCommon, content: rows })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    void dispatch(getSlipList());
  }, [dispatch]);

  useEffect(() => {
    // const slipData = 
  }, [slipCommon.No]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} localeText={jaJP1.components.MuiLocalizationProvider.defaultProps.localeText}>
      <div className="order-slip">
        <div className="tool-bar">
          <div className="title-part">
            <h2>受注伝票</h2>
            <div className="title-part__date">
              <div className="title-part__date__each">
                <h3>登録日</h3>
                <p>00/00/00</p>
              </div>
              <div className="title-part__date__each">
                <h3>更新日</h3>
                <p>00/00/00</p>
              </div>
            </div>
          </div>
          <div className="arrow-button-group">
            <StyledIconButton disabled={btnStatus.first === 'disable'}>
              <SkipPreviousIcon />
            </StyledIconButton>
            <StyledIconButton disabled={btnStatus.prev === 'disable'}>
              <ArrowBackIosIcon />
            </StyledIconButton>
            <StyledIconButton disabled={btnStatus.next === 'disable'}>
              <ArrowForwardIosIcon />
            </StyledIconButton>
            <StyledIconButton disabled={btnStatus.last === 'disable'}>
              <SkipNextIcon />
            </StyledIconButton>
          </div>
          <div className="action-btn">
            <NonBorderRadiusButton variant="outlined" disabled={btnStatus.delete === 'disable'}>削除</NonBorderRadiusButton>
            <NonBorderRadiusButton variant="outlined" disabled={btnStatus.cancel === 'disable'} onClick={handleCancel}>キャンセル</NonBorderRadiusButton>
            <NonBorderRadiusButton variant="outlined" disabled={btnStatus.save === 'disable'} onClick={handleSave} >保存</NonBorderRadiusButton>
          </div>
        </div>
        <Divider orientation='horizontal' />
        <div className="slip-body">
          <div className="common">
            <div className="common__left">
              <div className="common-item">
                <div className="common-item__small">
                  <p className="common-item__title">伝票番号</p>
                  <Autocomplete
                    disablePortal
                    id="No"
                    size='small'
                    value={slipCommon.No}
                    onChange={handleNoChange}
                    options={noList}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="" 
                      sx={{
                        borderRadius: "0px", 
                        "& .MuiAutocomplete-inputRoot": {
                          // paddingLeft: "20px !important",
                          borderRadius: "0px"
                        },
                      }} 
                    />}
                  />
                </div>
              </div>
              <div className="common-item">
                <div className="common-item__small">
                  <p className="common-item__small__title-first">伝票日付</p>
                  <DatePicker
                    className='common-item__small__input-left-date'
                    slotProps={{ textField: { size: 'small' } }}
                    format="YYYY-MM-DD"
                    value={slipCommon.slipDate}
                    onChange={(newValue) =>
                      setSlipCommon({ ...slipCommon, slipDate: newValue })
                    }
                  />
                </div>
                <div className="common-item__small">
                  <p className="common-item__small__title">納期日付</p>
                  <DatePicker
                    className='common-item__small__input-left-date'
                    slotProps={{ textField: { size: 'small' } }}
                    format="YYYY-MM-DD"
                    value={slipCommon.deliveryDate}
                    onChange={(newValue) =>
                      setSlipCommon({ ...slipCommon, deliveryDate: newValue })
                    }
                  />
                </div>
                <div className="common-item__small">
                  <p className="common-item__small__title">出荷予定日</p>
                  <DatePicker
                    className='common-item__small__input-left-date'
                    slotProps={{ textField: { size: 'small' } }}
                    format="YYYY-MM-DD"
                    value={slipCommon.shoppingDate}
                    onChange={(newValue) =>
                      setSlipCommon({ ...slipCommon, shoppingDate: newValue })
                    }
                  />
                </div>
              </div>
              <div className="common-item">
                <div className="common-item__small">
                  <p className="common-item__title">納品先コード</p>
                  <InputBase
                    className='common-item__small__input-left'
                    name='deliveryPlaceCode'
                    value={slipCommon.deliveryPlaceCode}
                    onChange={(e) =>
                      setSlipCommon({ ...slipCommon, [e.target.name]: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="common-item">
                <div className="common-item__small">
                  <p className="common-item__small__title-first">店舗コード</p>
                  <InputBase
                    className='common-item__small__input-left'
                    name='storehouseCode'
                    value={slipCommon.storehouseCode}
                    onChange={(e) =>
                      setSlipCommon({ ...slipCommon, [e.target.name]: e.target.value })
                    }
                  />
                </div>
                <div className="common-item__small">
                  <p className="common-item__small__title">掛率</p>
                  <InputBase
                    className='common-item__small__input-left'
                    type='number'
                    name='globalRate'
                    value={slipCommon.globalRate}
                    onChange={(e) =>
                      setSlipCommon({ ...slipCommon, [e.target.name]: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="common-item">
                <p className='common-item__alert'>※店舗コードは、直営店からの受注（移動伝票に振分）の場合のみ、入力してください。</p>
              </div>
            </div>
            <div className="common__right">
              <div className="common-item">
                <div className="common-item__small">
                  <p className="common-item__title">担当者コード </p>
                  <InputBase
                    className='common-item__small__input-left'
                    name='chargerCode'
                    value={slipCommon.chargerCode}
                    onChange={(e) =>
                      setSlipCommon({ ...slipCommon, [e.target.name]: e.target.value })
                    }
                  />
                </div>
                <div className="common-item__small">
                  <FormControlLabel
                    className='check-control'
                    control={
                      <Checkbox 
                        color="default" 
                        checked={slipCommon.status === "発注済み"}
                        onChange={handleStatusChange}
                        value="発注済み"
                      />
                    }
                    label="発注済み"
                  />
                </div>
              </div>
              <div className="common-item">
                <div className="common-item__small">
                  <p className="common-item__small__title-first">記入者コード </p>
                  <InputBase
                    className='common-item__small__input-left'
                    name='receiverCode'
                    value={slipCommon.receiverCode}
                    onChange={(e) =>
                      setSlipCommon({ ...slipCommon, [e.target.name]: e.target.value })
                    }
                  />
                </div>

                <div className="common-item__small">
                  <FormControlLabel
                    className='check-control'
                    control={
                      <Checkbox 
                        color="default" 
                        checked={slipCommon.status === "売上転送済み"}
                        onChange={handleStatusChange}
                        value="売上転送済み"
                      />
                    }
                    label="売上転送済み"
                  />
                </div>
              </div>
              <div className="common-item">
                <div className="common-item__small">
                  <p className="common-item__small__title-first">展示会コード</p>
                  <InputBase
                    className='common-item__small__input-left'
                    name='exhibitionCode'
                    value={slipCommon.exhibitionCode}
                    onChange={(e) =>
                      setSlipCommon({ ...slipCommon, [e.target.name]: e.target.value })
                    }
                  />
                </div>
                <div className="common-item__small">
                  <FormControlLabel
                    className='check-control'
                    control={
                      <Checkbox 
                        color="default" 
                        checked={slipCommon.status === "取置転送済み"}
                        onChange={handleStatusChange}
                        value="取置転送済み"
                      />
                    }
                    label="取置転送済み"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="slip-content">
            <DataGrid
              rows={rows}
              columns={columns}
              editMode="row"
              rowModesModel={rowModesModel}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
              slots={{
                toolbar: EditToolbar,
              }}
              slotProps={{
                toolbar: { setRows, setRowModesModel },
              }}
              localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
            />
            {CustomFooter()}
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default OrderSlip;