import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./index.scss";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BASEURL + "/v1/product/" + id)
      .then((response) => setProduct(response.data))
      .catch((error) => console.log(error));
    return () => {    
      } 
  }, [id]);

  const {_id, name, price, stock, status} = product;

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">
        Kembali
      </Link>
      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>: {_id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: Rp{price ? price.toLocaleString("id-ID") : price}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {stock}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>: {status ? "Active" : "Inactive"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Detail;
