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
import { getStorehouseList } from "../../store/basic/storehouseReducer";
import { getChargerList } from "../../store/basic/chargerReducer";
import { getExhibitionList } from "../../store/basic/exhibitionReducer";
import { getProductList } from "../../store/basic/productReducer";
import { getColorList } from "../../store/basic/colorReducer";
import { getSizeList } from "../../store/basic/sizeReducer";
import { randomId } from "@mui/x-data-grid-generator";
import {
  ConsignmentSlipInterface,
  getConsignmentSlipList,
} from "../../store/slip/consignmentSlipReducer";
import { getEntrustList } from "../../store/basic/entrustReducer";
import axiosApi from "../../utilities/axios";
import { Link } from "react-router-dom";
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
export const ConsignmentSlip = () => {
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
  const [selectedSlip, setSelectedSlip] = useState<ConsignmentSlipInterface>({
    id: 0,
    no: "",
    slip_date: formattedDate,
    entrust_code: "",
    storehouse_code: "",
    global_rate: "",
    charger_code: "",
    exhibition_code: "",
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
  const entrustList = useAppSelector(
    (state) => state.entrust.entrustList
  );
  const entrustCodeList: string[] = useMemo(() => {
    const lists = entrustList.map((item) => item.code ?? "");
    return lists;
  },[entrustList]);
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
  const colorList: string[] = useAppSelector((state) => {
    const lists = state.color.colorList.map((item) => item.code ?? "");
    return lists;
  });
  const sizeList: string[] = useAppSelector((state) => {
    const lists = state.size.sizeList.map((item) => item.code ?? "");
    return lists;
  });
  const consignmentList = useAppSelector(
    (state) => state.consignmentSlip.slips
  );
  const noList: string[] = useAppSelector((state) => {
    const ret = state.consignmentSlip.slips.map((slip) => slip.no ?? "");
    return ["新規登録", ...ret];
  });
  useEffect(() => {
    dispatch(getConsignmentSlipList());
    dispatch(getStorehouseList());
    dispatch(getEntrustList());
    dispatch(getChargerList());
    dispatch(getExhibitionList());
    dispatch(getProductList());
    dispatch(getColorList());
    dispatch(getSizeList());
  }, [consignmentList.length]);
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
  }, [consignmentList]);
  useEffect(() => {
    handleNoChange(noList[noList.length - 1]);
  }, [consignmentList.length]);
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
    console.log("asassass");
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    console.log(rows);
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
      slip_date: formattedDate,
      entrust_code: "",
      storehouse_code: "",
      global_rate: "",
      charger_code: "",
      exhibition_code: "",
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
    console.log(selectedSlip);
    if (selectedSlip.no === "新規登録") {
      axiosApi
        .post(`slip/consignment_slip/`, selectedSlip)
        .then((res) => {
          dispatch(getConsignmentSlipList());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const slip_id = consignmentList.filter(
        (item) => item.no === selectedSlip.no
      )[0]?.id;
      axiosApi
        .put(`slip/consignment_slip/${slip_id}`, selectedSlip)
        .then((res) => {
          console.log(res);
          dispatch(getConsignmentSlipList());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleNoChange = (noValue: string | null) => {
    if (noValue && noValue !== "新規登録") {
      const index = noList.indexOf(noValue) - 1;
      setSelectedSlip(consignmentList[index]);
      setRows(consignmentList[index]?.items);
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
    const slip_id = consignmentList.filter(
      (item) => item.no === selectedSlip.no
    )[0]?.id;
    console.log(rows);
    axiosApi
      .post(`slip/consignment_slip/saveRows/${slip_id}`, rows)
      .then((res) => dispatch(getConsignmentSlipList()));
  };
  const deleteSlip = () => {
    const slip_id = consignmentList.filter(
      (item) => item.no === selectedSlip.no
    )[0]?.id;
    axiosApi
      .delete(`slip/consignment_slip/${slip_id}`)
      .then((res) => {
        dispatch(getConsignmentSlipList());
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
            <h2 className="text-xl">委託伝票</h2>
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
                  <p className="w-40">委託番号</p>
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
                  <p className="w-40">伝票日付</p>
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
                  <p className="w-40">委託コード</p>
                  <Autocomplete
                    disablePortal
                    id="entrust_code"
                    size="small"
                    value={selectedSlip.entrust_code}
                    onChange={(event: any, entrustCode: string | null) =>
                      setSelectedSlip({
                        ...selectedSlip,
                        entrust_code: entrustCode ?? "",
                      })
                    }
                    options={entrustCodeList}
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
                  <p className="w-40 underline text-lg">
                    {
                      entrustList.filter(
                        (item) => item.code === selectedSlip.entrust_code
                      )[0]?.name
                    }
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center pb-3 gap-10">
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
                  <Link to="/purchase_order_slip">取置明細選択</Link>
                </NonBorderRadiusButton>
                <NonBorderRadiusButton variant="outlined">
                  <Link to="/order_slip">受注明細選択</Link>
                </NonBorderRadiusButton>
              </div>
              <div className="flex flex-col mt-2">
                <div className="flex w-full justify-end">
                  <div className="flex flex-col justify-self-end">
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
                <div className="flex flex-col">
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
                        chargerList.filter(
                          (item) => item.code === selectedSlip.charger_code
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
                        exhibitionList.filter(
                          (item) => item.code === selectedSlip.exhibition_code
                        )[0]?.name
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {selectedSlip.no !== "新規登録" && (
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
