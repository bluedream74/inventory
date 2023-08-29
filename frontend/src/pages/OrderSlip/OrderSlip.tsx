import "./OrderSlip.scss";
import React, { useEffect, useMemo, useState } from "react";
import {
  IconButton,
  Button,
  Divider,
  InputBase,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { jaJP as jaJP1 } from "@mui/x-date-pickers/locales";
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
  jaJP,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import axiosApi from "../../utilities/axios";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getSlipList } from "../../store/slip/orderSlipReducer";
import { getStorehouseList } from "../../store/basic/storehouseReducer";
import { getDeliveryList } from "../../store/basic/deliveryReducer";
import { getChargerList } from "../../store/basic/chargerReducer";
import { getExhibitionList } from "../../store/basic/exhibitionReducer";
import { getProductList } from "../../store/basic/productReducer";
import { ProductInterface } from "../ProductRegister/ProductRegister";
import { getColorList } from "../../store/basic/colorReducer";
import { getSizeList } from "../../store/basic/sizeReducer";
import { getDealerList } from "../../store/basic/dealerReducer";

const StyledIconButton = styled(IconButton)({
  border: "1px solid black",
  borderRadius: "0%",
});

const NonBorderRadiusButton = styled(Button)({
  borderRadius: "0%",
  color: "#000000",
  "&:hover": {
    color: "#222422",
  },
});

const roles = ["Market", "Finance", "Development"];

const initialRows: GridRowsProp = [];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

export interface IOrderSlip {
  id: number;
  no: string;
  slip_date: string;
  delivery_date: string;
  shopping_date: string;
  delivery_place_code: string;
  storehouse_code: string;
  global_rate: string;
  charger_code: string;
  receiver_code: string;
  exhibition_code: string;
  dealer_code : string;
  status: string;
  other: string;
  items: Array<any>;
}
export interface OrderSlipCommon {
  No: string | null;
  slipDate: Dayjs | null;
  deliveryDate: Dayjs | null;
  shoppingDate: Dayjs | null;
  deliveryPlaceCode: string | null;
  storehouseCode: string | null;
  globalRate: string;
  chargerCode: string | null;
  receiverCode: string;
  dealerCode: string | null;
  exhibitionCode: string | null;
  status: string;
}

export interface BtnStatusInterface {
  first: "active" | "disable";
  prev: "active" | "disable";
  next: "active" | "disable";
  last: "active" | "disable";
  delete: "active" | "disable";
  cancel: "active" | "disable";
  save: "active" | "disable";
}

export interface OrderProductInterfact {
  product_code: Array<string>;
  product_name: string;
  part_number: string;
  price: string;
}
const OrderSlip = () => {
  const dispatch = useAppDispatch();
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const [slipCommon, setSlipCommon] = useState<OrderSlipCommon>({
    No: "",
    slipDate: dayjs(formattedDate),
    deliveryDate: dayjs(formattedDate),
    shoppingDate: dayjs(formattedDate),
    deliveryPlaceCode: "",
    storehouseCode: "",
    globalRate: "100.0%",
    chargerCode: "",
    receiverCode: "",
    exhibitionCode: "",
    dealerCode: "",
    status: "発注済み",
  });
  const orderSlipList: Array<IOrderSlip> = useAppSelector(
    (state) => state.orderSlip.slips
  );
  const noList: string[] = useAppSelector((state) => {
    const ret = state.orderSlip.slips.map((slip) => slip.no ?? "");
    return ["新規登録", ...ret];
  });
  const storehouseList = useAppSelector(
    (state) => state.storehouse.storehouseList
  );
  const storehouseCodeList: string[] = useMemo(() => {
    const shl = storehouseList.map((item) => item.code ?? "");
    return shl;
  }, [storehouseList]);
  const deliveryList = useAppSelector((state) => state.delivery.deliveryList);
  const deliveryCodeList: string[] = useMemo(() => {
    const lists = deliveryList.map((item) => item.code ?? "");
    return lists;
  }, [deliveryList]);
  const chargerList = useAppSelector((state) => state.charger.chargerList);
  const chargerCodeList: string[] = useMemo(() => {
    const lists = chargerList.map((item) => item.code ?? "");
    return lists;
  }, [chargerList]);
  const dealerList = useAppSelector(state=>state.dealer.dealerList);
  const dealerCodeList = useMemo(()=>{
    const lists = dealerList.map(item=>item.code??'');
    return lists;
  },[dealerList])
  const exhibitionList = useAppSelector(
    (state) => state.exhibition.exhibitionList
  );
  const exhibitionCodeList: string[] = useMemo(() => {
    const lists = exhibitionList.map((item) => item.code ?? "");
    return lists;
  }, [exhibitionList]);
  const colorList: string[] = useAppSelector((state) => {
    const lists = state.color.colorList.map((item) => item.code ?? "");
    return lists;
  });
  const sizeList: string[] = useAppSelector((state) => {
    const lists = state.size.sizeList.map((item) => item.code ?? "");
    return lists;
  });
  const productList: Array<ProductInterface> = useAppSelector(
    (state) => state.product.productList
  );
  const proList: string[] = useAppSelector((state) => {
    const lists = state.product.productList.map((item) => item.code ?? "");
    return lists;
  });
  useEffect(() => {
    handleNoChange(slipCommon.No);
  }, [orderSlipList]);
  useEffect(() => {
    handleNoChange(noList[noList.length - 1]);
  }, [orderSlipList.length]);
  useEffect(() => {
    setBtnStatus({
      ...btnStatus,
      save: "active",
      cancel: "active",
    });
  }, [slipCommon]);
  function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
      const id = randomId();
      setRows((oldRows) => [...oldRows, { id, isNew: true }]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "product_code" },
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
  const [btnStatus, setBtnStatus] = useState<BtnStatusInterface>({
    first: "disable",
    prev: "disable",
    next: "disable",
    last: "disable",
    delete: "disable",
    cancel: "disable",
    save: "disable",
  });

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    console.log("asassass");
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
  const handleSaveRows = () => {
    const slip_id = orderSlipList.filter((item) => item.no === slipCommon.No)[0]
      ?.id;
    console.log(rows);
    axiosApi
      .post(`slip/order_slip/saveRows/${slip_id}`, rows)
      .then((res) => dispatch(getSlipList()));
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
    setSlipCommon({
      ...slipCommon,
      status: (event.target as HTMLInputElement).value,
    });
  };

  const handleNoChange = (noValue: string | null) => {
    if (noValue && noValue !== "新規登録") {
      const index = noList.indexOf(noValue) - 1;
      selectSilp(orderSlipList[index]);
      setRows(orderSlipList[index]?.items);
      setBtnStatus({
        ...btnStatus,
        first:
          noList.length > 2 && noValue !== noList[1] ? "active" : "disable",
        prev: noList.length > 2 && noValue !== noList[1] ? "active" : "disable",
        next:
          noList.length > 2 && noValue !== noList[noList.length - 1]
            ? "active"
            : "disable",
        last:
          noList.length > 2 && noValue !== noList[noList.length - 1]
            ? "active"
            : "disable",
        delete: "active",
      });
    } else handleCancel();
  };
  const selectSilp = (newSlip: IOrderSlip) => {
    setSlipCommon({
      No: newSlip.no,
      slipDate: dayjs(newSlip.slip_date),
      deliveryDate: dayjs(newSlip.delivery_date),
      shoppingDate: dayjs(newSlip.shopping_date),
      deliveryPlaceCode: newSlip.delivery_place_code,
      storehouseCode: newSlip.storehouse_code,
      globalRate: newSlip.global_rate,
      chargerCode: newSlip.charger_code,
      receiverCode: newSlip.receiver_code,
      exhibitionCode: newSlip.exhibition_code,
      dealerCode: newSlip.dealer_code,
      status: newSlip.status,
    });
    setRows(newSlip.items);
  };
  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleCloseDelete = () => {
    setDeleteOpen(false);
  };
  const DeleteModal = (
    <Dialog open={deleteOpen}>
      <DialogTitle textAlign="center">色削除</DialogTitle>
      <DialogContent>削除しましょか？</DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={handleCloseDelete}>キャンセル</Button>
        <Button
          color="secondary"
          onClick={() => deleteOrder()}
          variant="contained"
        >
          削除
        </Button>
      </DialogActions>
    </Dialog>
  );
  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    console.log(rows);
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const handleEditCellChange = (params: any) => {
    console.log(params);
    const { id, field, value } = params;
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const columns: GridColDef[] = [
    {
      field: "product_code",
      headerName: "商品コード ",
      minWidth: 150,
      align: "center",
      type: "singleSelect",
      valueOptions: proList,
      editable: true,
    },
    {
      field: "product_name",
      headerName: "商品名",
      minWidth: 150,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "product_part_number",
      headerName: "仮品番",
      minWidth: 100,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "size_code",
      headerName: "サイズ",
      minWidth: 100,
      align: "left",
      type: "singleSelect",
      valueOptions: sizeList,
      editable: true,
    },
    {
      field: "color_code",
      headerName: "色",
      minWidth: 100,
      align: "left",
      type: "singleSelect",
      valueOptions: colorList,
      editable: true,
    },
    {
      field: "quantity",
      headerName: "数量",
      minWidth: 120,
      align: "right",
      headerAlign: "left",
      editable: true,
      type: "number",
    },
    {
      field: "unit",
      headerName: "単位",
      minWidth: 80,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "max_cost",
      headerName: "上代単価",
      minWidth: 120,
      align: "right",
      headerAlign: "left",
      type: "number",
      editable: true,
    },
    {
      field: "rate",
      headerName: "掛率",
      minWidth: 120,
      align: "right",
      headerAlign: "left",
      type: "number",
      editable: true,
    },
    {
      field: "max_price",
      headerName: "上代金額",
      minWidth: 120,
      align: "right",
      headerAlign: "left",
      type: "number",
      editable: true,
    },
    {
      field: "min_cost",
      headerName: "下代単価 ",
      minWidth: 120,
      align: "right",
      headerAlign: "left",
      type: "number",
      editable: true,
    },
    {
      field: "cost",
      headerName: "原単価 ",
      minWidth: 120,
      align: "right",
      headerAlign: "left",
      type: "number",
      editable: true,
    },
    {
      field: "min_price",
      headerName: "下代金額 ",
      minWidth: 120,
      align: "right",
      headerAlign: "left",
      type: "number",
      editable: true,
    },
    {
      field: "price",
      headerName: "原価金額  ",
      minWidth: 120,
      align: "right",
      headerAlign: "left",
      type: "number",
      editable: true,
    },
    {
      field: "profit",
      headerName: "粗利金額 ",
      minWidth: 120,
      align: "right",
      headerAlign: "left",
      type: "number",
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "",
      minWidth: 120,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
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
    const quantitySum = selectedRows.reduce(
      (sum: number, row: any) => sum + (row.quantity || 0),
      0
    );
    const maxPriceSum = selectedRows.reduce(
      (sum: number, row: any) => sum + (row.max_price || 0),
      0
    );
    const minPriceSum = selectedRows.reduce(
      (sum: number, row: any) => sum + (row.min_price || 0),
      0
    );
    const profitSum = selectedRows.reduce(
      (sum: number, row: any) => sum + (row.profit || 0),
      0
    );

    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div></div>
        <div>合計数量: {quantitySum.toFixed(2)}</div>
        <div>合計上代: {maxPriceSum.toFixed(2)}</div>
        <div>合計金額: {minPriceSum.toFixed(2)}</div>
        <div>粗利金額: {profitSum.toFixed(2)}</div>
      </div>
    );
  };

  const handleCancel = () => {
    setSlipCommon({
      No: "新規登録",
      slipDate: dayjs(formattedDate),
      deliveryDate: dayjs(formattedDate),
      shoppingDate: dayjs(formattedDate),
      deliveryPlaceCode: "",
      storehouseCode: "",
      globalRate: "100.0",
      chargerCode: "",
      receiverCode: "",
      exhibitionCode: "",
      dealerCode: "",
      status: "発注済み",
    });
  };
  const deleteOrder = () => {
    const slip_id = orderSlipList.filter((item) => item.no === slipCommon.No)[0]
      ?.id;
    axiosApi
      .delete(`slip/order_slip/${slip_id}`)
      .then((res) => {
        setSlipCommon({ ...slipCommon, No: proList[proList.length - 1] });
        setDeleteOpen(false);
        dispatch(getSlipList());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSave = () => {
    if (slipCommon.No === "新規登録") {
      axiosApi
        .post(`slip/order_slip/`, slipCommon)
        .then((res) => {
          dispatch(getSlipList());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const slip_id = orderSlipList.filter(
        (item) => item.no === slipCommon.No
      )[0]?.id;
      axiosApi
        .put(`slip/order_slip/${slip_id}`, slipCommon)
        .then((res) => {
          dispatch(getSlipList());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    dispatch(getSlipList());
    dispatch(getStorehouseList());
    dispatch(getDeliveryList());
    dispatch(getChargerList());
    dispatch(getExhibitionList());
    dispatch(getProductList());
    dispatch(getColorList());
    dispatch(getSizeList());
    dispatch(getDealerList());
  }, [orderSlipList.length]);

  const changeSlip = (st: number) => {
    switch (st) {
      case 1:
        selectSilp(orderSlipList[0]);
        break;
      case 2:
        orderSlipList.map((item, index) => {
          if (item.no === slipCommon.No) selectSilp(orderSlipList[index - 1]);
        });
        break;
      case 3:
        orderSlipList.map((item, index) => {
          if (item.no === slipCommon.No) selectSilp(orderSlipList[index + 1]);
        });
        break;
      case 4:
        selectSilp(orderSlipList[orderSlipList.length - 1]);
        break;
      default:
        break;
    }
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={
        jaJP1.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
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
            <StyledIconButton
              disabled={btnStatus.first === "disable"}
              onClick={() => changeSlip(1)}
            >
              <SkipPreviousIcon />
            </StyledIconButton>
            <StyledIconButton
              disabled={btnStatus.prev === "disable"}
              onClick={() => changeSlip(2)}
            >
              <ArrowBackIosIcon />
            </StyledIconButton>
            <StyledIconButton
              disabled={btnStatus.next === "disable"}
              onClick={() => changeSlip(3)}
            >
              <ArrowForwardIosIcon />
            </StyledIconButton>
            <StyledIconButton
              disabled={btnStatus.last === "disable"}
              onClick={() => changeSlip(4)}
            >
              <SkipNextIcon />
            </StyledIconButton>
          </div>
          <div className="action-btn">
            <NonBorderRadiusButton
              variant="outlined"
              disabled={btnStatus.delete === "disable"}
              onClick={() => setDeleteOpen(true)}
            >
              削除
            </NonBorderRadiusButton>
            <NonBorderRadiusButton
              variant="outlined"
              disabled={btnStatus.cancel === "disable"}
              onClick={handleCancel}
            >
              キャンセル
            </NonBorderRadiusButton>
            <NonBorderRadiusButton
              variant="outlined"
              disabled={btnStatus.save === "disable"}
              onClick={handleSave}
            >
              保存
            </NonBorderRadiusButton>
          </div>
        </div>
        <Divider orientation="horizontal" />
        <div className="slip-body">
          <div className="common">
            <div className="common__left">
              <div className="common-item">
                <div className="common-item__small">
                  <p className="common-item__title">伝票番号</p>
                  <Autocomplete
                    disablePortal
                    id="No"
                    size="small"
                    value={slipCommon.No}
                    onChange={(event: any, noValue: string | null) =>
                      handleNoChange(noValue)
                    }
                    options={noList}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        sx={{
                          borderRadius: "0px",
                          "& .MuiAutocomplete-inputRoot": {
                            // paddingLeft: "20px !important",
                            borderRadius: "0px",
                          },
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="common-item">
                <div className="common-item__small">
                  <p className="common-item__small__title-first">伝票日付</p>
                  <DatePicker
                    className="common-item__small__input-left-date"
                    slotProps={{ textField: { size: "small" } }}
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
                    className="common-item__small__input-left-date"
                    slotProps={{ textField: { size: "small" } }}
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
                    className="common-item__small__input-left-date"
                    slotProps={{ textField: { size: "small" } }}
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
                  <Autocomplete
                    disablePortal
                    id="deliveryList"
                    size="small"
                    value={slipCommon.deliveryPlaceCode}
                    onChange={(event: any, newValue: string | null) =>
                      setSlipCommon({
                        ...slipCommon,
                        deliveryPlaceCode: newValue,
                      })
                    }
                    options={deliveryCodeList}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        sx={{
                          borderRadius: "0px",
                          "& .MuiAutocomplete-inputRoot": {
                            // paddingLeft: "20px !important",
                            borderRadius: "0px",
                          },
                        }}
                      />
                    )}
                  />
                  <p className="w-40 underline text-lg">
                    {
                      deliveryList.filter(
                        (item) => item.code === slipCommon.deliveryPlaceCode
                      )[0]?.name
                    }
                  </p>
                </div>
              </div>
              <div className="common-item">
                <div className="common-item__small">
                  <p className="common-item__small__title-first">店舗コード</p>
                  <Autocomplete
                    disablePortal
                    id="storehouseList"
                    size="small"
                    value={slipCommon.storehouseCode}
                    onChange={(event: any, newValue: string | null) =>
                      setSlipCommon({ ...slipCommon, storehouseCode: newValue })
                    }
                    options={storehouseCodeList}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        sx={{
                          borderRadius: "0px",
                          "& .MuiAutocomplete-inputRoot": {
                            // paddingLeft: "20px !important",
                            borderRadius: "0px",
                          },
                        }}
                      />
                    )}
                  />
                  <p className="w-40 underline text-lg">
                    {
                      storehouseList.filter(
                        (item) => item.code === slipCommon.storehouseCode
                      )[0]?.name
                    }
                  </p>
                </div>
                <div className="common-item__small">
                  <p className="common-item__small__title">掛率</p>
                  <InputBase
                    className="common-item__small__input-left"
                    type="number"
                    name="globalRate"
                    value={slipCommon.globalRate}
                    onChange={(e) =>
                      setSlipCommon({
                        ...slipCommon,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="common-item">
                <p className="common-item__alert">
                  ※店舗コードは、直営店からの受注（移動伝票に振分）の場合のみ、入力してください。
                </p>
              </div>
            </div>
            <div className="common__right">
            <div className="common-item">
                <div className="common-item__small">
                  <p className="common-item__title">得意先コード </p>
                  <Autocomplete
                    disablePortal
                    id="dealerList"
                    size="small"
                    value={slipCommon.dealerCode}
                    onChange={(event: any, newValue: string | null) =>
                      setSlipCommon({ ...slipCommon, dealerCode: newValue })
                    }
                    options={dealerCodeList}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        sx={{
                          borderRadius: "0px",
                          "& .MuiAutocomplete-inputRoot": {
                            // paddingLeft: "20px !important",
                            borderRadius: "0px",
                          },
                        }}
                      />
                    )}
                  />
                  <p className="w-40 text-lg underline">
                    {
                      dealerList.filter(
                        (item) => item.code === slipCommon.dealerCode
                      )[0]?.name
                    }
                  </p>
                </div>
              </div>
              <div className="common-item">
                <div className="common-item__small">
                  <p className="common-item__title">担当者コード </p>
                  <Autocomplete
                    disablePortal
                    id="chargerList"
                    size="small"
                    value={slipCommon.chargerCode}
                    onChange={(event: any, newValue: string | null) =>
                      setSlipCommon({ ...slipCommon, chargerCode: newValue })
                    }
                    options={chargerCodeList}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        sx={{
                          borderRadius: "0px",
                          "& .MuiAutocomplete-inputRoot": {
                            // paddingLeft: "20px !important",
                            borderRadius: "0px",
                          },
                        }}
                      />
                    )}
                  />
                  <p className="w-40 text-lg underline">
                    {
                      chargerList.filter(
                        (item) => item.code === slipCommon.chargerCode
                      )[0]?.name
                    }
                  </p>
                </div>
                <div className="common-item__small">
                  <FormControlLabel
                    className="check-control"
                    control={
                      <Checkbox
                        color="default"
                        checked={slipCommon.status === "1"}
                        onChange={handleStatusChange}
                        value="1"
                      />
                    }
                    label="発注済み"
                  />
                </div>
              </div>
              <div className="common-item">
                <div className="common-item__small">
                  <p className="common-item__small__title-first">
                    記入者コード{" "}
                  </p>
                  <Autocomplete
                    disablePortal
                    id="receiverCode"
                    size="small"
                    value={slipCommon.receiverCode}
                    onChange={(event: any, newValue: string | null) =>
                      setSlipCommon({
                        ...slipCommon,
                        receiverCode: newValue ?? "",
                      })
                    }
                    options={chargerCodeList}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        sx={{
                          borderRadius: "0px",
                          "& .MuiAutocomplete-inputRoot": {
                            // paddingLeft: "20px !important",
                            borderRadius: "0px",
                          },
                        }}
                      />
                    )}
                  />
                  <p className="w-40 text-lg underline">
                    {
                      chargerList.filter(
                        (item) => item.code === slipCommon.receiverCode
                      )[0]?.name
                    }
                  </p>
                </div>

                <div className="common-item__small">
                  <FormControlLabel
                    className="check-control"
                    control={
                      <Checkbox
                        color="default"
                        checked={slipCommon.status === "2"}
                        onChange={handleStatusChange}
                        value="2"
                      />
                    }
                    label="売上転送済み"
                  />
                </div>
              </div>
              <div className="common-item">
                <div className="common-item__small">
                  <p className="common-item__small__title-first">
                    展示会コード
                  </p>
                  <Autocomplete
                    disablePortal
                    id="exhibitionList"
                    size="small"
                    value={slipCommon.exhibitionCode}
                    onChange={(event: any, newValue: string | null) =>
                      setSlipCommon({ ...slipCommon, exhibitionCode: newValue })
                    }
                    options={exhibitionCodeList}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        sx={{
                          borderRadius: "0px",
                          "& .MuiAutocomplete-inputRoot": {
                            // paddingLeft: "20px !important",
                            borderRadius: "0px",
                          },
                        }}
                      />
                    )}
                  />
                  <p className="w-40 text-lg underline">
                    {
                      exhibitionList.filter(
                        (item) => item.code === slipCommon.exhibitionCode
                      )[0]?.name
                    }
                  </p>
                </div>
                <div className="common-item__small">
                  <FormControlLabel
                    className="check-control"
                    control={
                      <Checkbox
                        color="default"
                        checked={slipCommon.status === "3"}
                        onChange={handleStatusChange}
                        value="3"
                      />
                    }
                    label="取置転送済み"
                  />
                </div>
              </div>
            </div>
          </div>
          {slipCommon.No !== "新規登録" && slipCommon.No !== "" && (
            <div className="slip-content">
              <div className="flex justify-end pb-3">
                <NonBorderRadiusButton
                  variant="outlined"
                  onClick={handleSaveRows}
                  className="bg-red-300"
                >
                  明細保存
                </NonBorderRadiusButton>
              </div>

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
          )}
        </div>
      </div>

      {DeleteModal}
    </LocalizationProvider>
  );
};

export default OrderSlip;
