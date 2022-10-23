import axios from "axios";
import { useState } from "react";
import Input from "../../../components/Input";
import "./index.scss";

const Tambahv2 = () => {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    stock: 0,
    status: true,
  });
  const [errorMessageName, setErrorMessageName] = useState([]);

  const handleChange = (e) => {
    const { name, type, value } = e.target;
    setProduct((a) => {
      return type === "number"
        ? { ...a, [name]: Number(value) }
        : { ...a, [name]: value };
    });
  };

  const handleChangeCheckbox = (e) => {
    const { name, checked } = e.target;
    setProduct((prev) => {
      return { ...prev, [name]: checked };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, price, stock, status } = product;
    let errorName = [];

    //Verifikasi nama produk
    if (name.length < 3 || name.length > 30) {
      errorName = [
        ...errorName,
        "*Nama produk harus diisi 3 sampai 30 karakter!",
      ];
    }

    //Menampilkan pesan error jika ada, atau menambah produk jika sudah terverifikasi
    if (errorName.length > 0) {
      setErrorMessageName(errorName);
    } else {
      axios
        .post(process.env.REACT_APP_BASEURL + "/v2/product", {
          name,
          price,
          stock,
          status,
        })
        .then((res) => {
          console.log(res);
          alert("Produk berhasil ditambahkan!");
          window.location.reload();
        })
        .catch((error) => console.log(error));
      setErrorMessageName([]);
    }
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk v2</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Input
            name="name"
            type="text"
            placeholder="Nama Produk..."
            label="Nama"
            onChange={handleChange}
          />
          <ul>
            {errorMessageName
              ? errorMessageName.map((nameError, index) => {
                  return (
                    <li
                      key={index}
                      style={{
                        color: "red",
                        marginTop: "-15px",
                        marginBottom: "10px",
                        listStyleType: "none",
                      }}
                    >
                      {nameError}
                    </li>
                  );
                })
              : ""}
          </ul>
          <Input
            name="price"
            type="number"
            placeholder="Harga Produk..."
            label="Harga"
            onChange={handleChange}
          />
          <Input
            name="stock"
            type="number"
            placeholder="Stock Produk..."
            label="Stock"
            onChange={handleChange}
          />
          <Input
            name="status"
            type="checkbox"
            label="Active"
            defaultChecked={true}
            onChange={handleChangeCheckbox}
          />
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tambahv2;
