/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import ListFashion from "views/fashions/ListFashion";
import {
  ListCategorys,
  AddCategory,
  Dashboard,
  Icons,
  EditCategory,
  FashionsAdd,
  EditFashion,
  ListOrder
} from "./views";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/categorys",
    name: "Categorys",
    icon: "nc-icon nc-world-2",
    component: ListCategorys,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/categorys/add",
    name: "Add Categorys",
    component: AddCategory,
    layout: "/admin",
  },
  {
    path: "/categorys/edit/:id",
    name: "Edit Categorys",
    component: EditCategory,
    layout: "/admin",
  },
  {
    path: "/fashions",
    name: "Fashions",
    icon: "nc-icon nc-cart-simple",
    component: ListFashion,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/fashions/add",
    name: "Fashions Add",
    component: FashionsAdd,
    layout: "/admin",
  },
  {
    path: "/fashions/edit/:id",
    name: "Edit Fashion",
    component: EditFashion,
    layout: "/admin",
  },
  {
    path: "/order",
    name: "Orders",
    icon: "nc-icon nc-cart-simple",
    component: ListOrder,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin",
    sidebar: true,
  },
];
export default routes;
