import { Button, Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { UserIcon } from "./assets/userIcon";
import { div } from "framer-motion/client";
import { ProductIcon } from "./assets/productIcon";
import { SalesIcon } from "./assets/saleIcon";
import TableComponent from "./components/table";
import { useEffect, useState } from "react";
import TableProcts from "./components/tableProducts";
import TableSales from "./components/tableSales";





export default function App() {
 

  return (
    <div className="flex w-full h-screen flex-col items-center">
      <Tabs color="primary" aria-label="Options">
        <Tab key="photos" title={
          <div className="flex items-center gap-2 ">
            <UserIcon className="max-w-4" />
            <span>User</span>
          </div>
        }>
          <Card className="min-w-full">
            <CardBody className="w-full">
              <TableComponent/>
             
            </CardBody>
          </Card>
        </Tab>
        <Tab key="music" title={
          <div className="flex items-center grap-2">
            <ProductIcon className="max-w-4"/>
            <span>Product</span>
          </div>
        }>
          <Card>
            <CardBody>
              <TableProcts/>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="videos" title={
          <div className="flex items-center grap-2">
            <SalesIcon  className="max-w-4"/>
            <span>Sales</span>
          </div>
        }>
          <Card>
            <CardBody>
              <TableSales/>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}