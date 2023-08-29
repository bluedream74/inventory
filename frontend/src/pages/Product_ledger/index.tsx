import { Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { jaJP as jaJP1 } from "@mui/x-date-pickers/locales";

import { useEffect, useState} from "react";
import {
  GridRowsProp,
} from "@mui/x-data-grid";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getProductLedgerList } from "../../store/slip/productLedgerRuducer";

export const ProductLedger = () => {
  const dispatch = useAppDispatch();
  const initialRows: GridRowsProp = [];
  const [rows, setRows] = useState(initialRows);
  
  const productLedgerList = useAppSelector(
    (state) => state.productLedger.slips
  );
  useEffect(() => {
    productLedgerList.length > 0 && setRows(productLedgerList);
  }, [productLedgerList.length]);
  console.log(rows);
  useEffect(() => {
    dispatch(getProductLedgerList());
  }, [dispatch]);
  

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
            <h2 className="text-xl">商品台帳</h2>
          </div>
        </div>
        <Divider orientation="horizontal" />
        <div className=""></div>
        <div className="flex flex-col w-full justify-center mt-3 px-10">
          <div className="">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">商品コード</TableCell>
                    <TableCell align="center">商品名</TableCell>
                    <TableCell align="center">上代</TableCell>
                    <TableCell align="center">サイズ</TableCell>
                    <TableCell align="center">受注</TableCell>
                    <TableCell align="center">発注</TableCell>
                    <TableCell align="center">入荷</TableCell>
                    <TableCell align="center">出荷</TableCell>
                    <TableCell align="center">取置残</TableCell>
                    <TableCell align="center">委託残</TableCell>
                    <TableCell align="center">在庫</TableCell>
                    <TableCell align="center">可能数</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, key) => (
                    <TableRow
                      key={key}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center">
                        {row.product_code}
                      </TableCell>
                      <TableCell align="center">{row.product_name}</TableCell>
                      <TableCell align="center">{row.max_price}</TableCell>
                      <TableCell align="center">{row.size_code}</TableCell>
                      <TableCell align="center">{row.total_order??0}</TableCell>
                      <TableCell align="center">{row.total_purchaseorder??0}</TableCell>
                      <TableCell align="center">{row.total_in??0}</TableCell>
                      <TableCell align="center">{row.total_out??0}</TableCell>
                      <TableCell align="center">0</TableCell>
                      <TableCell align="center">0</TableCell>
                      <TableCell align="center">{row.total_quantity??0}</TableCell>
                      <TableCell align="center">0</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};
