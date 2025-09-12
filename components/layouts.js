/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { IoList, IoCloseCircleOutline } from "react-icons/io5";
// import { Context, userContext } from "@/pages/_app";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import * as rdd from "react-device-detect";
import { MdDashboard, MdPriceCheck } from "react-icons/md";
// import { FaUser } from "react-icons/fa6";
import { MdOutlineLogout } from "react-icons/md";
import { Api } from "@/services/service";
import { Context, userContext } from "@/pages/_app";
import { BiSolidCategory } from "react-icons/bi";

const menuItems = [
  {
    href: "/",
    title: "Dashboard",
    icon: <MdDashboard />,
    activeIcon: "/home.png",
    access: ["admin"],
  },
  {
    href: "/categories",
    title: "Categories",
    icon: <BiSolidCategory />,
    activeIcon: "/home.png",
    access: ["admin"],
  },
  {
    href: "/service-provider",
    title: "Service Provider",
    icon: <BiSolidCategory />,
    activeIcon: "/home.png",
    access: ["admin"],
  },
  // {
  //   href: "/transporter",
  //   title: "Transporter",
  //   icon: <MdPriceCheck />,
  //   activeIcon: "/home.png",
  //   access: ["SUBADMIN", "ADMIN"],
  // },
  // {
  //   href: "/truck-type",
  //   title: "Truck Type",
  //   icon: <MdPriceCheck />,
  //   activeIcon: "/home.png",
  //   access: ["ADMIN"],
  // },
  // {
  //   href: "/load-type",
  //   title: "Load Type",
  //   icon: <MdPriceCheck />,
  //   activeIcon: "/home.png",
  //   access: ["ADMIN"],
  // },
  // {
  //   href: "/unit",
  //   title: "Unit",
  //   icon: <MdPriceCheck />,
  //   activeIcon: "/home.png",
  //   access: ["ADMIN"],
  // },
  // {
  //   href: "/percentage",
  //   title: "Service Fee",
  //   icon: <MdPriceCheck />,
  //   activeIcon: "/home.png",
  //   access: ["ADMIN"],
  // },
  // {
  //   href: "/sub-admin",
  //   title: "Sub Admin",
  //   icon: <MdPriceCheck />,
  //   activeIcon: "/home.png",
  //   access: ["ADMIN"],
  // },
  // {
  //   href: "/activity-report",
  //   title: "Activity Report",
  //   icon: <MdPriceCheck />,
  //   activeIcon: "/home.png",
  //   access: ["ADMIN"],
  // },
];

const Layout = ({ children, loader, toaster }) => {
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [pageShow, setPageShow] = useState(false);
  const [orgList, setOrgList] = useState([]);
  const [userDetail, setUserDetail] = useState({});
  const [initial, setInitial] = useContext(Context);
  const [user, setUser] = useContext(userContext);
  const [userName, setUserName] = useState("ADMIN");
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [organizationOpen, setOrganizationOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOrganizationOpen(false);
  };

  useEffect(() => {
    setMobile(rdd.isMobile);
    if (rdd.isBrowser) {
      setToggleDrawer(true);
    }
    // getUserDetail();
  }, [mobile]);

  const getUserDetail = () => {
    const user = localStorage.getItem("userDetail");
    if (!!user) {
      setUserDetail(JSON.parse(user));
      setUser(JSON.parse(user));
    } else {
      if (router.route !== "/" && router.route !== "/signup") {
        router.push("/");
      }
    }
  };

  useEffect(() => {
    getusername();
    router.events.on("routeChangeComplete", () => { });
  }, [user, initial]);

  const getOrg = () => {
    loader(true);
    Api("get", "organizations", "", router).then(
      async (res) => {
        loader(false);
        // ;
        if (res?.status) {
          setOrgList(res.data.users);
        } else {
          toaster({ type: "success", message: res?.message });
        }
      },
      (err) => {
        loader(false);
        toaster({ type: "error", message: err.message });
        console.log(err);
      }
    );
  };

  const getusername = () => {
    // console.log(user)
    setUserName(user?.name);
    // console.log(userName, initial);
  };

  return (
    <>
      <div className="md:min-h-screen flex sm:flex-1 flex-col bg-[var(--custom-lightGray)]">
        {router.route !== "/login" && router.route !== "/forget-password" && router.route !== "/signup" && router.route !== "/privacy" && router.route !== "/term" && (
          <header
            className={`bg-white fixed top-0 w-full h-16 flex  font-semibold uppercase  z-30 ${toggleDrawer && user?.id !== "6450e9bef4d2cc08c2ec0431"
              ? "ml-60"
              : "ml-0"
              }`}
          >
            <div className="flex justify-center items-center">
              {mobile && (
                <IoList
                  className="text-black h-8 w-8 mx-5"
                  onClick={() => {
                    setToggleDrawer(!toggleDrawer);
                  }}
                />
              )}

              <div
                className={`flex-1  fixed right-5 justify-end ${toggleDrawer ? "hidden md:flex" : "flex"
                  }`}
              >
                <div
                  className="flex-1 flex justify-center item-center cursor-pointer"
                  onClick={handleClickOpen}
                >
                  <div className="flex justify-center items-center">
                    <h2 className="text-black text-base font-normal	 normal-case text-center pr-2">SignOut</h2>
                    <div className="h-10 w-10 bg-[var(--custom-orange)] flex justify-center items-center rounded-full">
                      <MdOutlineLogout className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
        )}
        {router.route !== "/login" &&
          router.route !== "/forget-password" &&
          router.route !== "/signup" &&
          router.route !== "/privacy" && router.route !== "/term" &&
          toggleDrawer &&
          user?.id !== "6450e9bef4d2cc08c2ec0431" && (
            <aside className={`bg-[var(--custom-orange)] w-60  fixed  min-h-screen z-40 `}>
              <div className="p-4 flex justify-center items-center">
                <div className="w-full h-[100px] bg-white rounded  flex justify-center items-center ">
                  <img
                    src="/logo.png"
                    className="rounded-md overflow-hidden w-[158px] h-[57px] object-contain"
                  />
                </div>
              </div>

              <nav className="">
                {/* border-t-2 border-white  */}
                <ul>
                  {menuItems.map((item) => (
                    <div key={item.title} className={` pr-3 gap-2 ${item.access.includes(user?.role) ? 'flex' : 'hidden'} `}>
                      <div className={` w-2  rounded-r-[5px] ${router.route === item.href ? 'bg-white ' : 'bg-[var(--custom-orange)]'}`}></div>
                      <li
                        className={`${router.route === item.href
                          ? "bg-white"
                          : "bg-[var(--custom-orange)] border border-l-8 border-[var(--custom-orange)]"
                          } py-2  flex  px-5 w-full align-middle rounded-[5px]`}
                        onClick={() => {
                          router.push(item.href);
                          if (mobile) {
                            setToggleDrawer(!toggleDrawer);
                          }
                          console.log(item.title)
                        }}
                      >

                        <Link href={item.href} className="w-full">
                          <p
                            className={`${router.route === item.href
                              ? "text-black"
                              : "text-white"
                              } flex  w-full   font-normal cursor-pointer text-sm font-nunito text-center`}
                          >
                            {item.title}
                          </p>
                        </Link>
                      </li>
                    </div>
                  ))}
                </ul>
              </nav>
            </aside>
          )}
        <div className="flex flex-col md:flex-row z-0 h-full  md:mt-0 mt-16">
          <main
            className={
              router.route !== "/login"
                && router.route !== "/forget-password" &&
                router.route !== "/signup" &&
                router.route !== "/privacy" && router.route !== "/term" &&
                toggleDrawer &&
                user?.id !== "6450e9bef4d2cc08c2ec0431"
                ? " md:pl-60 md:w-full  md:pt-16"
                : "flex-1"
            }
          >
            {children}
          </main>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Alert
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Do you want to logout ?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                router.push("/login");
                localStorage.clear();
                setOpen(false);
                setUser({});
                setInitial({});
              }}
            >
              Logout
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={organizationOpen} onClose={handleClose}>
          <div className="px-5 pt-20 pb-5 border-2  border-custom-blue bg-black relative overflow-hidden w-80">
            <IoCloseCircleOutline
              className="text-custom-blue h-8 w-8 absolute right-2 top-2"
              onClick={handleClose}
            />
            <p className="text-white text-lg font-semibold">Organization</p>
            <select
              className="w-full bg-white text-white border-2 border-custom-blue rounded-md p-2 mt-2 outline-none"
              value={JSON.stringify(initial)}
              onChange={(text) => {
                setInitial(JSON.parse(text.target.value));
                handleClose();
              }}
            >
              <option value={JSON.stringify({})}>Select</option>
              {orgList.map((item) => (
                <option value={JSON.stringify(item)} key={item._id}>
                  {item.username}
                </option>
              ))}
            </select>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default Layout;
