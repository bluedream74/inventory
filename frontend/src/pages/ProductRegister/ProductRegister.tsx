/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import './ProductRegister.scss';
import React, { useState, useEffect, useMemo } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getProductList } from '../../store/basic/productReducer';
import downArrow from '../../assets/downArrow.svg';
import upArrow from '../../assets/upArrow.svg';
import ImageInput from '../../components/ImageInput';
import axiosApi, { BASE_URL } from '../../utilities/axios';

export interface ProductInterface {
  id: number;
  image_url: string;
  image_mode: string;
  code: string;
  part_number: string;
  name: string;
  ancient_time: string;
  price: number;
}

const ProductRegister: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.product.productList);
  const [filter, setFilter] = useState<string>('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage] = useState<number>(10);
  const [open, setOpen] = React.useState(false);
  const [imageFile, setImageFile] = useState<File>();
  const [modalData, setModalData] = useState<ProductInterface>({
    id: 0,
    image_mode: "",
    image_url: "",
    name: "",
    part_number: "",
    ancient_time: "",
    code: "",
    price: 0
  });

  const [deleteOpen, setDeleteOpen] = useState(false);
  console.log(data);
  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleImageSelect = (file: File) => {
    setImageFile(file);
  }

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
      image_mode: "",
      image_url: "",
      name: "",
      part_number: "",
      ancient_time: "",
      code: "",
      price: 0
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
      if(imageFile) formData.set('image_url', imageFile);
      axiosApi
        .put(`product_register/${modalData.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          handleClose();
          dispatch(getProductList());
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      const formData = new FormData();
      Object.keys(modalData).forEach((key) => {
        formData.append(key, modalData[key]);
      });
      if(imageFile) formData.set('image_url', imageFile);

      axiosApi
        .post("product_register/", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          console.log(res.data)
          handleClose();
          void dispatch(getProductList());
        })
        .catch(err => {
          console.log(err);
        })
    }
  };

  const handleDeleteRow = (id: number) => {
    axiosApi
      .delete(`product_register/${id}`)
      .then(res => {
        dispatch(getProductList());
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
      <DialogTitle textAlign="center">商品登録</DialogTitle>
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
            <ImageInput onImageSelect={handleImageSelect} originImageUrl={ modalData.id ? BASE_URL + modalData.image_url : "" } />
            <TextField
              key="image_mode"
              label="絵型"
              name="image_mode"
              value={modalData.image_mode}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setModalData({ ...modalData, [e.target.name]: e.target.value })
              }
            />
            <TextField
              key="code"
              label="商品コード"
              name="code"
              value={modalData.code}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setModalData({ ...modalData, [e.target.name]: e.target.value })
              }
            />
            <TextField
              key="part_number"
              label="仮品番"
              name="part_number"
              value={modalData.part_number}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setModalData({ ...modalData, [e.target.name]: e.target.value })
              }
            />
            <TextField
              key="name"
              label="商品名"
              name="name"
              value={modalData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setModalData({ ...modalData, [e.target.name]: e.target.value })
              }
            />
            <TextField
              key="ancient_time"
              label="上代"
              name="ancient_time"
              defaultValue={modalData.ancient_time}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setModalData({ ...modalData, [e.target.name]: e.target.value })
              }
            />
            <TextField
              key="price"
              label="原価"
              name="price"
              type='number'
              defaultValue={modalData.price}
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
      <DialogTitle textAlign="center">書品削除</DialogTitle>
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
    <div className='product_register'>
      <div className="toolbar">
        <div>
          <button className='product_add' onClick={handleAddRow}>書品登録</button>
          {ModalSection}
          {DeleteModal}
        </div>
        <input className='filter_input' type="text" value={filter} onChange={handleFilterChange} placeholder="検索" />
      </div>

      <div className="table-wrap">
        <table className='styled-table'>
          <thead>
            <tr>
              <th className='id' onClick={() => handleSort('id')}>ID</th>
              <th className='image_url' >商品画像</th>
              <th className='image_mode' onClick={() => handleSort('image_mode')}>
                絵型
                {sortColumn === "image_mode" &&
                  (sortDirection === "asc"
                    ? <img className='sort-icon' src={upArrow} />
                    : <img className='sort-icon' src={downArrow} />
                  )
                }
              </th>
              <th onClick={() => handleSort('code')}>
                商品コード
                {sortColumn === "code" &&
                  (sortDirection === "asc"
                    ? <img className='sort-icon' src={upArrow} />
                    : <img className='sort-icon' src={downArrow} />
                  )
                }
              </th>
              <th onClick={() => handleSort('part_number')}>
                仮品番
                {sortColumn === "part_number" &&
                  (sortDirection === "asc"
                    ? <img className='sort-icon' src={upArrow} />
                    : <img className='sort-icon' src={downArrow} />
                  )
                }
              </th>
              <th onClick={() => handleSort('name')}>
                商品名
                {sortColumn === "name" &&
                  (sortDirection === "asc"
                    ? <img className='sort-icon' src={upArrow} />
                    : <img className='sort-icon' src={downArrow} />
                  )
                }
              </th>
              <th onClick={() => handleSort('ancient_time')}>
                上代
                {sortColumn === "ancient_time" &&
                  (sortDirection === "asc"
                    ? <img className='sort-icon' src={upArrow} />
                    : <img className='sort-icon' src={downArrow} />
                  )
                }
              </th>
              <th onClick={() => handleSort('price')}>
                原価
                {sortColumn === "price" &&
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
                <td>
                  <img src={BASE_URL + row.image_url} width="150" alt="" />
                </td>
                <td>{row.image_mode}</td>
                <td>{row.code}</td>
                <td>{row.part_number}</td>
                <td>{row.name}</td>
                <td>{row.ancient_time}</td>
                <td>{row.price}</td>
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

export default ProductRegister;
