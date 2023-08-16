/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import './BrandRegister.scss';
import React, { useState, useEffect, useMemo } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getBrandList } from '../../store/basic/brandReducer';
import downArrow from '../../assets/downArrow.svg';
import upArrow from '../../assets/upArrow.svg';
import axiosApi from '../../utilities/axios';

export interface BrandInterface {
  id: number;
  code: string;
  name: string;
  name_export: string;
}

const BrandRegister: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.brand.brandList);
  const [filter, setFilter] = useState<string>('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage] = useState<number>(10);
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = useState<BrandInterface>({
    id: 0,
    name: "",
    code: "",
    name_export: ""
  });

  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    void dispatch(getBrandList());
  }, [dispatch]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  }

  const handleAddRow = () => {
    setModalData({
      id: 0,
      name: "",
      code: "",
      name_export: ""
    });
    setOpen(true);
  };

  const handleEditRow = (id: number) => {
    const selectedRow = data.filter((row) => row.id === id);
    setModalData(selectedRow[0]);
    setOpen(true);
  };

  const handleModalSubmit = () => {
    if (modalData.id) {
      const formData = new FormData();
         Object.keys(modalData).forEach((key) => {
        formData.append(key, modalData[key]);
      });
      axiosApi
        .put(`brand_register/${modalData.id}`, modalData)
        .then(res => {
          handleClose();
          void dispatch(getBrandList());
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      const formData = new FormData();
      Object.keys(modalData).forEach((key) => {
        formData.append(key, modalData[key]);
      });
      axiosApi
        .post("brand_register/", modalData)
        .then(res => {
          handleClose();
          void dispatch(getBrandList());
        })
        .catch(err => {
          console.log(err);
        })
    }
  };

  const handleDeleteRow = (id: number) => {
    axiosApi
      .delete(`brand_register/${id}`)
      .then(res => {
        void dispatch(getBrandList());
        handleCloseDelete();
      })
      .catch(err => {
        console.log(err);
      })
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCloseDelete = () => {
    setDeleteOpen(false);
  }

  const handleOpenDelete = (id: number) => {
    const selectedRow = data.filter((row) => row.id === id);
    setModalData(selectedRow[0]);
    setDeleteOpen(true);
  }

  const filteredData = useMemo(() => {
    return data.filter(
      (row) => row.name.toLowerCase().includes(filter.toLowerCase())
    )
  }, [data, filter]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (sortColumn) {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    })
  }, [filteredData, sortDirection, sortColumn]);

  const currentRows = useMemo(() => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    return sortedData.slice(indexOfFirstRow, indexOfLastRow)
  }, [currentPage, rowsPerPage, sortedData]);
  const totalPages = useMemo(() => {
    return Math.ceil(sortedData.length / rowsPerPage);
  }, [sortedData, rowsPerPage]);

  const ModalSection = (
    <Dialog open={open}>
      <DialogTitle textAlign="center">ブランド登録</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
              paddingTop: '1rem'
            }}
          >
            {modalData.id !== 0 &&
              <TextField
                key="id"
                label="ID"
                name="id"
                value={modalData.id}
                onChange={(e) =>
                  setModalData({ ...modalData, [e.target.name]: e.target.value })
                }
                disabled
              />
            }
            <TextField
              key="code"
              label="ブランドコード"
              name="code"
              value={modalData.code}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setModalData({ ...modalData, [e.target.name]: e.target.value })
              }
            />
            <TextField
              key="name"
              label="ブランド名"
              name="name"
              value={modalData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setModalData({ ...modalData, [e.target.name]: e.target.value })
              }
            />
            <TextField
              key="name_export"
              label="ブランド名(輸出用)"
              name="name_export"
              value={modalData.name_export}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setModalData({ ...modalData, [e.target.name]: e.target.value })
              }
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={handleClose}>キャンセル</Button>
        <Button color="secondary" onClick={handleModalSubmit} variant="contained">
          {modalData.id === 0 ? "登録" : "変更"}
        </Button>
      </DialogActions>
    </Dialog>
  );

  const DeleteModal = (
    <Dialog open={deleteOpen}>
      <DialogTitle textAlign="center">ブランド削除</DialogTitle>
      <DialogContent>
        削除しましょか？
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={handleCloseDelete}>キャンセル</Button>
        <Button color="secondary" onClick={() => handleDeleteRow(modalData.id)} variant="contained">
          削除
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div className='brand_register'>
      <div className="toolbar">
        <div>
          <button className='brand_add' onClick={handleAddRow}>ブランド登録</button>
          {ModalSection}
          {DeleteModal}
        </div>
        <input className='filter_input' type="text" value={filter} onChange={handleFilterChange} placeholder="検索" />
      </div>

      <div className="table-wrap">
        <table className='styled-table'>
          <thead>
            <tr>
              <th className='id' onClick={() => handleSort('id')}>
                ID
                {sortColumn === "id" &&
                  (sortDirection === "asc"
                    ? <img className='sort-icon' src={upArrow} />
                    : <img className='sort-icon' src={downArrow} />
                  )
                }
              </th>
              <th onClick={() => handleSort('code')}>
                ブランドコード
                {sortColumn === "code" &&
                  (sortDirection === "asc"
                    ? <img className='sort-icon' src={upArrow} />
                    : <img className='sort-icon' src={downArrow} />
                  )
                }
              </th>
              <th onClick={() => handleSort('name')}>
                ブランド名
                {sortColumn === "name" &&
                  (sortDirection === "asc"
                    ? <img className='sort-icon' src={upArrow} />
                    : <img className='sort-icon' src={downArrow} />
                  )
                }
              </th>
              <th onClick={() => handleSort('name_export')}>
                ブランド名(輸出用)
                {sortColumn === "name_export" &&
                  (sortDirection === "asc"
                    ? <img className='sort-icon' src={upArrow} />
                    : <img className='sort-icon' src={downArrow} />
                  )
                }
              </th>
              <th className='row_action'></th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.code}</td>
                <td>{row.name}</td>
                <td>{row.name_export}</td>
                <td className='row_action'>
                  <button className='edit_button' onClick={() => handleEditRow(row.id)}>
                    編集
                  </button>
                  <button className='delete_button' onClick={() => handleOpenDelete(row.id)}>削除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button key={page} onClick={() => handlePageChange(page)}>
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BrandRegister;
