import {
  Autocomplete,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  InputBase,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
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
import { useState, useEffect, useMemo } from "react";
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
import { randomId } from "@mui/x-data-grid-generator";
import {
  PaymentSlipInterface,
  getPaymentSlipList,
} from "../../store/slip/paymentSlipReducer";
import axiosApi from "../../utilities/axios";
import { getPurchaseSlipList } from "../../store/slip/purchaseSlipReducer";
import { getFactoryList } from "../../store/basic/factoryReducer";
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
export const PaymentSlip = () => {
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
  console.log(currentDate);
  const formattedDate = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;
  const [selectedSlip, setSelectedSlip] = useState<PaymentSlipInterface>({
    id: 0,
    no: "",
    slip_date: formattedDate,
    supplier_code: "",
    last_payment_date: formattedDate,
    last_payment: "",
    expected_date: formattedDate,
    remain_payment: "",
    purchase: 0,
    other: "",
    update_date: formattedDate,
    items: [],
  });

  const dispatch = useAppDispatch();

  const suplierList = useAppSelector((state) => state.factory.factoryList);
  const supplierCodeList: string[] = useMemo(() => {
    const lists = suplierList.map((item) => item.code ?? "");
    return lists;
  }, [suplierList]);
  const paymentList = useAppSelector((state) => state.paymentSlip.slips);
  const noList: string[] = useAppSelector((state) => {
    const ret = state.paymentSlip.slips.map((slip) => slip.no ?? "");
    return ["新規登録", ...ret];
  });
  const purchaseList = useAppSelector((state) => state.purchaseSlip.slips);
  const purchaseNoList = useMemo(() => {
    const lists = purchaseList.map((item) =>
      item.factory_code === selectedSlip.supplier_code
        ? { value: item.id, label: item.no }
        : { value: 0, label: "" }
    );
    return lists;
  }, [purchaseList, selectedSlip.supplier_code]);
  useEffect(() => {
    handleNoChange(selectedSlip.no);
  }, [paymentList]);
  useEffect(() => {
    dispatch(getPurchaseSlipList());
    dispatch(getPaymentSlipList());
    dispatch(getFactoryList());
  }, [dispatch]);
  useEffect(() => {
    handleNoChange(noList[noList.length - 1]);
  }, [paymentList.length]);
  const handleSaveClick = (id: GridRowId) => () => {
    const selectRow = rows.filter((item) => item.id === id)[0];
    const slip_id = paymentList.filter((item) => item.no === selectedSlip.no)[0]
      ?.id;
    axiosApi
      .post(`slip/payment_slip/saveRow/${slip_id}`, selectRow)
      .then((res) => dispatch(getPaymentSlipList()));
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
    axiosApi.post(`slip/payment_slip/deleteRow`, { row_id: id }).then((res) => {
      if (res) {
        dispatch(getPaymentSlipList());
        setRows(rows.filter((row) => row.id !== id));
      }
    });
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
    const slip_id = paymentList.filter((item) => item.no === selectedSlip.no)[0]
      ?.id;
    axiosApi
      .post(`slip/payment_slip/saveRow/${slip_id}`, newRow)
      .then((res) => dispatch(getPaymentSlipList()));
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
      field: "payment_category",
      headerName: "入金区分",
      width: 300,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
    {
      field: "payment_price",
      headerName: "入金額",
      minWidth: 150,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "payment_date",
      headerName: "手形期日",
      minWidth: 150,
      type: "date",
      valueFormatter(params) {
        const date = new Date(params.value);
        return date.toLocaleDateString("en-US");
      },
      align: "left",
      headerAlign: "left",
      editable: true,
    },

    {
      field: "other",
      headerName: "備考",
      minWidth: 400,
      align: "left",
      headerAlign: "left",
      editable: true,
    },

    {
      field: "actions",
      type: "actions",
      headerName: "",
      minWidth: 150,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        const selectRow = rows.filter((item) => item.id === id)[0];
        if (isInEditMode || selectRow.status === "edit") {
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
      slip_date: formattedDate,
      supplier_code: "",
      last_payment_date: formattedDate,
      last_payment: "",
      expected_date: formattedDate,
      remain_payment: "",
      purchase: 0,
      other: "",
      items: [],
      update_date: formattedDate,
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
    console.log(selectedSlip);
    if (selectedSlip.no === "新規登録") {
      axiosApi
        .post(`slip/payment_slip/`, selectedSlip)
        .then((res) => {
          dispatch(getPaymentSlipList());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const slip_id = paymentList.filter(
        (item) => item.no === selectedSlip.no
      )[0]?.id;
      axiosApi
        .put(`slip/payment_slip/${slip_id}`, selectedSlip)
        .then((res) => {
          console.log(res);
          dispatch(getPaymentSlipList());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  console.log(selectedSlip, purchaseNoList)
  const handlePurchaseNoChange = (val: number) => {
    setSelectedSlip({ ...selectedSlip, purchase: val ?? 0 });
    const purchaseItem = purchaseList.filter((item) => item.id === val)[0];
    setRows(purchaseItem.items);
  };
  const handleNoChange = (noValue: string | null) => {
    console.log("dsdfsdfsd", noValue);
    if (noValue && noValue !== "新規登録") {
      const index = noList.indexOf(noValue) - 1;
      setSelectedSlip(paymentList[index]);
      setRows(paymentList[index]?.items);
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
    const slip_id = paymentList.filter((item) => item.no === selectedSlip.no)[0]
      ?.id;
    console.log(rows);
    axiosApi
      .post(`slip/payment_slip/saveRows/${slip_id}`, rows)
      .then((res) => dispatch(getPaymentSlipList()));
  };
  const deleteSlip = () => {
    const slip_id = paymentList.filter((item) => item.no === selectedSlip.no)[0]
      ?.id;
    axiosApi
      .delete(`slip/payment_slip/${slip_id}`)
      .then((res) => {
        dispatch(getPaymentSlipList());
        setDeleteOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const get_all_payment = useMemo(() => {
    let all_payment = 0;
    selectedSlip?.items.map((item) => (all_payment += item.payment_price * 1));
    return all_payment;
  }, [selectedSlip]);

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
            <h2 className="text-xl">支払伝票</h2>
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
          <div className="flex py-3 px-10 justify-between">
            <div className="flex flex-col">
              <div className="flex items-center justify-start pb-3">
                <div className="flex items-center">
                  <p className="w-40">伝票番号 </p>
                  <Autocomplete
                    disablePortal
                    id="no"
                    size="small"
                    value={selectedSlip.no}
                    onChange={(event: any, noValue: string | null) =>
                      handleNoChange(noValue)
                    }
                    options={noList}
                    className="w-72"
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
              <div className="flex items-center justify-start pb-3">
                <div className="flex items-center">
                  <p className="w-40">支払日付 </p>
                  <DatePicker
                    className="w-72 border-solid border-gray border-2"
                    slotProps={{ textField: { size: "small" } }}
                    format="YYYY-MM-DD"
                    value={dayjs(selectedSlip.slip_date)}
                    onChange={(newValue) => {
                      console.log(newValue);
                      setSelectedSlip({
                        ...selectedSlip,
                        slip_date: newValue?.format("YYYY-MM-DD"),
                      });
                    }}
                  />
                </div>
              </div>
              <div className="flex items-left justify-start pb-3">
                <div className="flex items-center">
                  <p className="w-40">仕入先コード</p>
                  <Autocomplete
                    disablePortal
                    id="entrust_code"
                    size="small"
                    value={selectedSlip.supplier_code}
                    onChange={(event: any, value: string | null) =>
                      setSelectedSlip({
                        ...selectedSlip,
                        supplier_code: value ?? "",
                        purchase: 0,
                      })
                    }
                    options={supplierCodeList}
                    className="w-72"
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
                      suplierList.filter(
                        (item) => item.code === selectedSlip.supplier_code
                      )[0]?.name
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-start pb-3">
                <div className="flex items-center">
                  <p className="w-40">仕入番号 </p>
                  <Autocomplete
                    disablePortal
                    id="no"
                    size="small"
                    value={
                      purchaseNoList.filter(
                        (item) => item.value === selectedSlip.purchase
                      )[0] ?? { value: 0, label: "" }
                    }
                    onChange={(event: any, val) =>
                      handlePurchaseNoChange(val ? val.value : 0)
                    }
                    options={purchaseNoList}
                    className="w-72"
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
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <p className="w-40">前回請求日 </p>
                <DatePicker
                  className="w-72 border-solid border-gray border-2"
                  slotProps={{ textField: { size: "small" } }}
                  format="YYYY-MM-DD"
                  value={dayjs(selectedSlip.last_payment_date)}
                  onChange={(newValue) => {
                    console.log(newValue);
                    setSelectedSlip({
                      ...selectedSlip,
                      last_payment_date: newValue?.format("YYYY-MM-DD"),
                    });
                  }}
                />
              </div>
              <div className="flex items-center mt-1">
                <p className="w-40">前師求額 </p>
                <InputBase
                  type="text"
                  name="last_payment"
                  className="border-[1px] border-gray-400 border-solid w-[65%] px-3"
                  value={selectedSlip.last_payment}
                  onChange={(e) =>
                    setSelectedSlip({
                      ...selectedSlip,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-center mt-1">
                <p className="w-40">支払予定日 </p>
                <DatePicker
                  className="w-72 border-solid border-gray border-2"
                  slotProps={{ textField: { size: "small" } }}
                  format="YYYY-MM-DD"
                  value={dayjs(selectedSlip.expected_date)}
                  onChange={(newValue) => {
                    console.log(newValue);
                    setSelectedSlip({
                      ...selectedSlip,
                      expected_date: newValue?.format("YYYY-MM-DD"),
                    });
                  }}
                />
              </div>
              <div className="flex items-center mt-1">
                <p className="w-40">買掛残高 </p>
                <InputBase
                  type="text"
                  name="remain_payment"
                  className="border-[1px] border-gray-400 border-solid w-[65%] px-3"
                  value={selectedSlip.remain_payment}
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
        </div>
        {selectedSlip.no !== "新規登録" && (
          <div className="flex flex-col w-full justify-center mt-3 px-10">
            <div className="">
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
              value={selectedSlip.other}
              onChange={(e) =>
                setSelectedSlip({
                  ...selectedSlip,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-row gap-3 pr-10">
            <Typography>合計金額</Typography>
            <Typography>{get_all_payment}</Typography>
            <Typography pl={2}>締処理</Typography>
            <Typography>
              {selectedSlip.items ? `${selectedSlip.items.length} 未` : "0"}
            </Typography>
          </div>
        </div>
        {DeleteModal}
      </div>
    </LocalizationProvider>
  );
};
