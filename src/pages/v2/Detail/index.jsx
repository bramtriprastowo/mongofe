import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./index.scss";

const Detailv2 = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/v2/product/" + id)
      .then((response) => setProduct(response.data[0]))
      .catch((error) => console.log(error));
    return () => {    
      } 
  }, [id]);

  const {_id, name, price, stock, status} = product;

  return (
    <div className="main">
      <Link to="/v2" className="btn btn-primary">
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

export default Detailv2;
