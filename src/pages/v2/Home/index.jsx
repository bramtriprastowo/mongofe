import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import axios from "axios";

const Homev2 = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const searchChange = (e) => {
    setSearch(e.target.value);
  };

  const deleteProduct = async (_id) => {
    let deleteItem = await window.confirm("Hapus produk ini?");
    if (deleteItem) {
      axios
        .delete("http://localhost:3001/api/v2/product/" + _id)
        .then(() => {
          alert("Produk berhasil dihapus!");
          window.location.reload();
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/v2/product?name=" + search)
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, [search]);

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">
        Add Product
      </Link>
      <div className="search">
        <input
          type="text"
          placeholder="Masukan kata kunci..."
          onChange={(e) => searchChange(e)}
        />
      </div>
      <br />
      <br />
      <h1>API v2</h1>
      <table className="table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => {
              const { _id, name, price } = product;

              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{name}</td>
                  <td className="text-right">
                    Rp{price ? price.toLocaleString("id-ID") : price}
                  </td>
                  <td className="text-center">
                    <Link to={`v2/detail/${_id}`} className="btn btn-sm btn-info">
                      Detail
                    </Link>
                    <Link
                      to={`v2/edit/${_id}`}
                      className="btn btn-sm btn-warning"
                    >
                      Edit
                    </Link>
                    <Link
                      to="#"
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteProduct(_id)}
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>-</td>
              <td>Barang tidak ditemukan</td>
              <td></td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Homev2;
