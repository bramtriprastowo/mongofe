// import axios from "axios";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../../components/Input";

const Edit = () => {
  const id = useParams().id;
  const [product, setProduct] = useState({});
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

    //Menampilkan pesan error jika ada, atau mengedit produk jika sudah terverifikasi
    if (errorName.length > 0) {
      setErrorMessageName(errorName);
    } else {
      axios
        .put(process.env.REACT_APP_BASEURL + "/v1/product/" + id, {
          name,
          price,
          stock,
          status,
        })
        .then((res) => {
          alert("Update berhasil!");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          alert("Update gagal!");
        });
      setErrorMessageName([]);
    }
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BASEURL + "/v1/product/" + id)
      .then((response) => setProduct(response.data))
      .then(() => setProduct((prev) => {
        return { ...prev, status: true };
      }))
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk v1</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Input
            name="name"
            type="text"
            placeholder="Nama Produk..."
            label="Nama"
            value={product.name || ""}
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
            value={product.price || ""}
            onChange={handleChange}
          />
          <Input
            name="stock"
            type="number"
            placeholder="Stock Produk..."
            label="Stock"
            value={product.stock || ""}
            onChange={handleChange}
          />
          <Input
            name="status"
            type="checkbox"
            label="Active"
            defaultChecked={true}
            value={product.status || ""}
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

export default Edit;
