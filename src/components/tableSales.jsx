import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Avatar, Chip, Tooltip } from "@nextui-org/react";
import { DeleteIcon } from "../assets/DeleteIcon";
import { EditIcon } from "../assets/EditIcon";
import { EyeIcon } from "../assets/EyeIcon";



const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const columns = [
  { name: "PRODUCTID", uid: "productid" },
  { name: "USERID", uid: "userid" },
  { name:"QUANTITY", uid: "quantity" },
  { name: "DATE", uid: "date" },
  { name: "PRICE", uid: "price" },
  { name: "CLASS", uid: "class" },
  { name: "ACTIONS", uid: "actions" },
];

export default function TableSales() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:1975/sales", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const users = await response.json();
        setData(users);
        console.log(users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (saleid) =>{
    try {
      const response = await fetch(`http://localhost:1975/sales/${saleid}`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
    });
    if (response.ok) {
      window.location.reload();
    }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "productid":
        return (
          <div className="flex justify-between items-center gap-4">
            <Avatar radius="lg" src={user.productID?.image.secure_Url}/>
            {user.productID?.product_name}
          </div>
        );
      case "userid":
        return (
          <div className="flex justify-center items-center m-4">
            <p>{user.userID?.fullname}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <button onClick={() => handleDelete(user._id)}>

                <DeleteIcon />

                </button>
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
