import {
  Autocomplete,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { jaJP as jaJP1 } from "@mui/x-date-pickers/locales";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import dayjs, { Dayjs } from "dayjs";
import { useState, useEffect, useMemo, memo } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarContainer,
  jaJP,
} from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getStorehouseList } from "../../store/basic/storehouseReducer";
import { getChargerList } from "../../store/basic/chargerReducer";
import { getExhibitionList } from "../../store/basic/exhibitionReducer";
import { getProductList } from "../../store/basic/productReducer";
import { getColorList } from "../../store/basic/colorReducer";
import { getSizeList } from "../../store/basic/sizeReducer";
import { randomId } from "@mui/x-data-grid-generator";
import {
  SaleItemInterface,
  SaleSlipInterface,
  getSaleSlipList,
} from "../../store/slip/saleSlipReducer";
import axiosApi from "../../utilities/axios";
import { Link } from "react-router-dom";
import { getDeliveryList } from "../../store/basic/deliveryReducer";
import { DeliveryInterface } from "../DeliveryRegister/DeliveryRegister";
import { getDealerList } from "../../store/basic/dealerReducer";
import { getSlipList } from "../../store/slip/orderSlipReducer";
export interface BtnStatusInterface {
  first: "active" | "disable";
  prev: "active" | "disable";
  next: "active" | "disable";
  last: "active" | "disable";
  delete: "active" | "disable";
  cancel: "active" | "disable";
  save: "active" | "disable";
}

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
interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}
export const SaleSlip = () => {
  const [btnStatus, setBtnStatus] = useState<BtnStatusInterface>({
    first: "disable",
    prev: "disable",
    next: "disable",
    last: "disable",
    delete: "disable",
    cancel: "disable",
    save: "disable",
  });

  const initialRows: GridRowsProp = [];
  const [rows, setRows] = useState(initialRows);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;
  const [selectedSlip, setSelectedSlip] = useState<SaleSlipInterface>({
    id: 0,
    no: "",
    spenden_no: "",
    slip_date: formattedDate,
    expected_shipping_date: formattedDate,
    arrival_date: formattedDate,
    invoice_date: formattedDate,
    shipping_date: formattedDate,
    cash_credit: "",
    delivery_code: "",
    storehouse_code: "",
    global_rate: "",
    charger_code: "",
    maker_code: "",
    exhibition_code: "",
    dealer_code: "",
    order_no: "",
    status: "",
    other: "",
    update_date: formattedDate,
    items: [],
  });

  const dispatch = useAppDispatch();
  const proList: string[] = useAppSelector((state) => {
    const lists = state.product.productList.map((item) => item.code ?? "");
    return lists;
  });
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
  const exhibitionList = useAppSelector(
    (state) => state.exhibition.exhibitionList
  );
  const exhibitionCodeList: string[] = useMemo(() => {
    const lists = exhibitionList.map((item) => item.code ?? "");
    return lists;
  }, [exhibitionList]);
  const storehouseList = useAppSelector(
    (state) => state.storehouse.storehouseList
  );
  const storehouseCodeList: string[] = useMemo(() => {
    const shl = storehouseList.map((item) => item.code ?? "");
    return shl;
  }, [storehouseList]);
  const dealerList = useAppSelector(
    (state) => state.dealer.dealerList
  );
  const dealerCodeList: string[] = useMemo(() => {
    const shl = dealerList.map((item) => item.code ?? "");
    return shl;
  }, [dealerList]);
  const colorList: string[] = useAppSelector((state) => {
    const lists = state.color.colorList.map((item) => item.code ?? "");
    return lists;
  });
  const sizeList: string[] = useAppSelector((state) => {
    const lists = state.size.sizeList.map((item) => item.code ?? "");
    return lists;
  });
  const saleList = useAppSelector((state) => state.saleSlip.slips);
  const noList: string[] = useAppSelector((state) => {
    const ret = state.saleSlip.slips.map((slip) => slip.no ?? "");
    return ["新規登録", ...ret];
  });
  const orderList = useAppSelector((state)=>state.orderSlip.slips)
  const orderNoList = useMemo(()=>{
    const lists = orderList.map(item => item.no ?? '');
    return lists;
  },[orderList])
  useEffect(() => {
    dispatch(getSlipList());
    dispatch(getSaleSlipList());
    dispatch(getStorehouseList());
    dispatch(getDealerList());
    dispatch(getDeliveryList());
    dispatch(getChargerList());
    dispatch(getExhibitionList());
    dispatch(getProductList());
    dispatch(getColorList());
    dispatch(getSizeList());
  }, [saleList.length]);
  const get_quantity = useMemo(() => {
    let all_quantity = 0;
    selectedSlip?.items.map((item) => (all_quantity += item.quantity));
    return all_quantity;
  }, [selectedSlip]);
  const get_price = useMemo(() => {
    let all_price = 0;
    selectedSlip?.items.map((item) => (all_price += item.price));
    return all_price;
  }, [selectedSlip]);
  useEffect(() => {
    handleNoChange(selectedSlip.no);
  }, [saleList]);
  useEffect(() => {
    handleNoChange(noList[noList.length - 1]);
  }, [saleList.length]);
  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
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
  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };
  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };
  const EditToolbar = (props: EditToolbarProps) => {
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
      field: "rate",
      headerName: "掛率",
      minWidth: 120,
      align: "right",
      headerAlign: "left",
      type: "number",
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
      field: "max_price",
      headerName: "上代金額",
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

  const changeSlip = (st: number) => {
    const index = noList.indexOf(selectedSlip.no);
    switch (st) {
      case 1:
        handleNoChange(noList[1]);
        break;
      case 2:
        handleNoChange(noList[index - 1]);
        break;
      case 3:
        handleNoChange(noList[index + 1]);
        break;
      case 4:
        handleNoChange(noList[noList.length - 1]);
        break;
      default:
        break;
    }
  };
  const handleCancel = () => {
    setSelectedSlip({
      id: 0,
      no: "新規登録",
      spenden_no: "",
      slip_date: formattedDate,
      expected_shipping_date: formattedDate,
      arrival_date: formattedDate,
      invoice_date: formattedDate,
      shipping_date: formattedDate,
      cash_credit: "",
      delivery_code: "",
      storehouse_code: "",
      global_rate: "",
      charger_code: "",
      maker_code: "",
      exhibition_code: "",
      dealer_code: "",
      order_no: "",
      status: "",
      other: "",
      update_date: formattedDate,
      items: [],
    });
  };
  useEffect(() => {
    setBtnStatus({
      ...btnStatus,
      save: "active",
      cancel: "active",
    });
  }, [selectedSlip]);
  const handleSave = () => {
    if (selectedSlip.no === "新規登録") {
      axiosApi
        .post(`slip/sale_slip/`, selectedSlip)
        .then((res) => {
          dispatch(getSaleSlipList());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const slip_id = saleList.filter(
        (item: SaleSlipInterface) => item.no === selectedSlip.no
      )[0]?.id;
      axiosApi
        .put(`slip/sale_slip/${slip_id}`, selectedSlip)
        .then((res) => {
          console.log(res);
          dispatch(getSaleSlipList());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleOrderNoChange = (orderNo: string| null) => {
    
    const orderSlip = orderList.filter( item=>item.no === orderNo )[0];
    setSelectedSlip({...selectedSlip, 
      order_no: orderNo??'',
      delivery_code: orderSlip.delivery_place_code,
      storehouse_code: orderSlip.storehouse_code,
      global_rate: orderSlip.global_rate,
      charger_code: orderSlip.charger_code,
      maker_code: orderSlip.receiver_code,
      exhibition_code: orderSlip.exhibition_code,
      dealer_code: orderSlip.dealer_code,
    })
    const orderItem = orderSlip.items?.map((item : any)=> item ??null)
    orderItem && setRows(orderItem);
    
  }
  const handleNoChange = (noValue: string | null) => {
    if (noValue && noValue !== "新規登録") {
      const index = noList.indexOf(noValue) - 1;
      setSelectedSlip(saleList[index]);
      setRows(saleList[index]?.items);
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
  const handleSaveRows = () => {
    const slip_id = saleList.filter((item) => item.no === selectedSlip.no)[0]
      ?.id;
    axiosApi
      .post(`slip/sale_slip/saveRows/${slip_id}`, rows)
      .then((res) => dispatch(getSaleSlipList()));
  };
  const deleteSlip = () => {
    const slip_id = saleList.filter((item) => item.no === selectedSlip.no)[0]
      ?.id;
    axiosApi
      .delete(`slip/sale_slip/${slip_id}`)
      .then((res) => {
        dispatch(getSaleSlipList());
        setDeleteOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const DeleteModal = (
    <Dialog open={deleteOpen}>
      <DialogTitle textAlign="center">色削除</DialogTitle>
      <DialogContent>削除しましょか？</DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={() => setDeleteOpen(false)}>キャンセル</Button>
        <Button color="secondary" onClick={deleteSlip} variant="contained">
          削除
        </Button>
      </DialogActions>
    </Dialog>
  );
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={
        jaJP1.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <div className="w-full py-5 px-8 mt-0 mb-auto min-w-[1028px]">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-end gap-5">
            <h2 className="text-xl">売上伝票</h2>
            <div className="flex gap-4">
              <div className="flex items-end gap-1">
                <h3>登録日</h3>
                <p className="text-lg">
                  {selectedSlip.no !== "新規登録"
                    ? selectedSlip.slip_date
                    : "00/00/00"}
                </p>
              </div>
              <div className="flex items-end gap-1">
                <h3>更新日</h3>
                <p className="text-lg">
                  {selectedSlip.no !== "新規登録"
                    ? selectedSlip.update_date
                    : "00/00/00"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
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
          <div className="flex gap-3">
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
        <div className="">
          <div className="flex p-3 justify-between">
            <div className="flex flex-col">
              <div className="flex items-center justify-start pb-3">
                <div className="flex items-center">
                  <p className="w-40">伝票番号</p>
                  <Autocomplete
                    disablePortal
                    id="no"
                    size="small"
                    value={selectedSlip.no}
                    onChange={(event: any, noValue: string | null) =>
                      handleNoChange(noValue)
                    }
                    options={noList}
                    className="w-40"
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
                <div className="flex items-center">
                  <p className="w-40">受注伝票</p>
                  <Autocomplete
                    disablePortal
                    id="no"
                    size="small"
                    value={selectedSlip.order_no}
                    onChange={(event: any, noValue: string | null) =>
                      handleOrderNoChange(noValue)
                    }
                    options={orderNoList}
                    className="w-40"
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
                <div className="flex items-center">
                  <p className="w-40">専伝番号</p>
                  <InputBase
                    name="spenden_no"
                    className="border-[1px] border-gray-400 border-solid w-40 px-3"
                    value={selectedSlip.spenden_no}
                    onChange={(e) =>
                      setSelectedSlip({
                        ...selectedSlip,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-row items-center justify-start pb-3">
                <div className="flex items-center">
                  <p className="w-40">伝票日付</p>
                  <DatePicker
                    className="w-40 border-solid border-gray border-2"
                    slotProps={{ textField: { size: "small" } }}
                    format="YYYY-MM-DD"
                    value={dayjs(selectedSlip.slip_date)}
                    onChange={(newValue) => {
                      setSelectedSlip({
                        ...selectedSlip,
                        slip_date: newValue?.format("YYYY-MM-DD"),
                      });
                    }}
                  />
                </div>
                <div className="flex items-center">
                  <p className="w-40">請求日付</p>
                  <DatePicker
                    className="w-40 border-solid border-gray border-2"
                    slotProps={{ textField: { size: "small" } }}
                    format="YYYY-MM-DD"
                    value={dayjs(selectedSlip.invoice_date)}
                    onChange={(newValue) => {
                      setSelectedSlip({
                        ...selectedSlip,
                        invoice_date: newValue?.format("YYYY-MM-DD"),
                      });
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-row items-center justify-start pb-3">
                <div className="flex items-center">
                  <p className="w-40">出荷予定日</p>
                  <DatePicker
                    className="w-40 border-solid border-gray border-2"
                    slotProps={{ textField: { size: "small" } }}
                    format="YYYY-MM-DD"
                    value={dayjs(selectedSlip.expected_shipping_date)}
                    onChange={(newValue) => {
                      setSelectedSlip({
                        ...selectedSlip,
                        expected_shipping_date: newValue?.format("YYYY-MM-DD"),
                      });
                    }}
                  />
                </div>
                <div className="flex items-center">
                  <p className="w-40">着日日付</p>
                  <DatePicker
                    className="w-40 border-solid border-gray border-2"
                    slotProps={{ textField: { size: "small" } }}
                    format="YYYY-MM-DD"
                    value={dayjs(selectedSlip.arrival_date)}
                    onChange={(newValue) => {
                      setSelectedSlip({
                        ...selectedSlip,
                        arrival_date: newValue?.format("YYYY-MM-DD"),
                      });
                    }}
                  />
                </div>
              </div>
              <div className="flex items-left justify-start pb-3">
                <div className="flex items-center">
                  <p className="w-40">納品先コード</p>
                  <Autocomplete
                    disablePortal
                    id="entrust_code"
                    size="small"
                    value={selectedSlip.delivery_code}
                    onChange={(event: any, entrustCode: string | null) =>
                      setSelectedSlip({
                        ...selectedSlip,
                        delivery_code: entrustCode ?? "",
                      })
                    }
                    options={deliveryCodeList}
                    className="w-40"
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
                        (item) => item.code === selectedSlip.delivery_code
                      )[0]?.name
                    }
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center justify-start pb-3 gap-10">
                <div className="flex items-center">
                  <p className="w-40">店舗コード</p>
                  <Autocomplete
                    disablePortal
                    id="storehouse_code"
                    size="small"
                    value={selectedSlip.storehouse_code}
                    onChange={(event: any, storehouseCode: string | null) =>
                      setSelectedSlip({
                        ...selectedSlip,
                        storehouse_code: storehouseCode ?? "",
                      })
                    }
                    options={storehouseCodeList}
                    className="w-40"
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
                        (item) => item.code === selectedSlip.storehouse_code
                      )[0]?.name
                    }
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="w-40">掛率</p>
                  <InputBase
                    type="number"
                    name="global_rate"
                    className="border-[1px] border-gray-400 border-solid w-32 px-3"
                    value={selectedSlip.global_rate}
                    onChange={(e) =>
                      setSelectedSlip({
                        ...selectedSlip,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-end gap-2">
                <NonBorderRadiusButton variant="outlined">
                  <Link to="/consignment_slip">委託明細選択</Link>
                </NonBorderRadiusButton>
                <NonBorderRadiusButton variant="outlined">
                  <Link to="/purchase_order_slip">取置明細選択</Link>
                </NonBorderRadiusButton>
                <NonBorderRadiusButton variant="outlined">
                  <Link to="/order_slip">受注明細選択</Link>
                </NonBorderRadiusButton>
              </div>
              <div className="flex flex-col mt-4">
                <div className="flex flex-row items-center justify-start pb-3">
                  <div className="flex items-center">
                    <p className="w-40">出荷日</p>
                    <DatePicker
                      className="w-40 border-solid border-gray border-2"
                      slotProps={{ textField: { size: "small" } }}
                      format="YYYY-MM-DD"
                      value={dayjs(selectedSlip.shipping_date)}
                      onChange={(newValue) => {
                        setSelectedSlip({
                          ...selectedSlip,
                          shipping_date: newValue?.format("YYYY-MM-DD"),
                        });
                      }}
                    />
                  </div>
                  <div className="flex items-center">
                    <p className="w-28">現金/掛売上</p>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          size="small"
                          value={selectedSlip.cash_credit}
                          onChange={(e: SelectChangeEvent) =>
                            setSelectedSlip({
                              ...selectedSlip,
                              cash_credit: e.target.value,
                            })
                          }
                        >
                          <MenuItem value="現金">現金</MenuItem>
                          <MenuItem value="掛売上">掛売上</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="flex flex-col">
                  <div className="flex items-center mt-2">
                      <p className="w-40">得意先コード </p>
                      <Autocomplete
                        disablePortal
                        id="dealer_code"
                        size="small"
                        value={selectedSlip.dealer_code}
                        onChange={(e: any, chargerCode: string | null) =>
                          setSelectedSlip({
                            ...selectedSlip,
                            dealer_code: chargerCode ?? "",
                          })
                        }
                        options={dealerCodeList}
                        className="w-40"
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
                            (item) => item.code === selectedSlip.dealer_code
                          )[0]?.name
                        }
                      </p>
                    </div>
                    <div className="flex items-center mt-2">
                      <p className="w-40">担当者コード </p>
                      <Autocomplete
                        disablePortal
                        id="charger_code"
                        size="small"
                        value={selectedSlip.charger_code}
                        onChange={(e: any, chargerCode: string | null) =>
                          setSelectedSlip({
                            ...selectedSlip,
                            charger_code: chargerCode ?? "",
                          })
                        }
                        options={chargerCodeList}
                        className="w-40"
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
                            (item) => item.code === selectedSlip.charger_code
                          )[0]?.name
                        }
                      </p>
                    </div>
                    <div className="flex items-center mt-2">
                      <p className="w-40">記入者コード </p>
                      <Autocomplete
                        disablePortal
                        id="charger_code"
                        size="small"
                        value={selectedSlip.maker_code}
                        onChange={(e: any, val: string | null) =>
                          setSelectedSlip({
                            ...selectedSlip,
                            maker_code: val ?? "",
                          })
                        }
                        options={chargerCodeList}
                        className="w-40"
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
                            (item) => item.code === selectedSlip.maker_code
                          )[0]?.name
                        }
                      </p>
                    </div>
                    <div className="flex items-center mt-2">
                      <p className="w-40">展示会コード </p>
                      <Autocomplete
                        disablePortal
                        id="no"
                        size="small"
                        value={selectedSlip.exhibition_code}
                        onChange={(e: any, exhibitionCode: string | null) =>
                          setSelectedSlip({
                            ...selectedSlip,
                            exhibition_code: exhibitionCode ?? "",
                          })
                        }
                        options={exhibitionCodeList}
                        className="w-40"
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
                            (item) => item.code === selectedSlip.exhibition_code
                          )[0]?.name
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col pl-5">
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="default"
                          checked={selectedSlip.status === "1"}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setSelectedSlip({
                              ...selectedSlip,
                              status: (event.target as HTMLInputElement).value,
                            });
                          }}
                          value="1"
                        />
                      }
                      label="委託書発行済"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="default"
                          checked={selectedSlip.status === "2"}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setSelectedSlip({
                              ...selectedSlip,
                              status: (event.target as HTMLInputElement).value,
                            });
                          }}
                          value="2"
                        />
                      }
                      label="あとで発行"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {rows.length !== 0 && (
          <div className="flex flex-col mt-3">
            <div className="flex justify-end pb-3">
              <NonBorderRadiusButton
                variant="outlined"
                onClick={handleSaveRows}
                className="bg-red-300"
              >
                明細保存
              </NonBorderRadiusButton>
            </div>
            <div>
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
            </div>
          </div>
        )}
        <div className="px-3 flex justify-between mt-4 ">
          <div className="flex items-center">
            <p className="w-40">掛率</p>
            <InputBase
              type="text"
              name="other"
              className="border-[1px] border-gray-400 border-solid w-96 px-3"
              value={selectedSlip.other ?? ""}
              onChange={(e) =>
                setSelectedSlip({
                  ...selectedSlip,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-row gap-3 pr-5">
            <Typography>合計数量</Typography>
            <Typography>{get_quantity}</Typography>
            <Typography pl={2}>合計金額</Typography>
            <Typography>{get_price}</Typography>
          </div>
        </div>
        {DeleteModal}
      </div>
    </LocalizationProvider>
  );
};
