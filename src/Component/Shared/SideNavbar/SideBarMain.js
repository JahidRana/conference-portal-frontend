import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import './SideNavbar.css';
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";

export default function SideBarMain({item}){
    const [open, setOpen] = useState(false)
    const {loggedUser} = useContext(AuthContext)
    
    if(item.childrens){
        return (
            <div className={open ? "sidebar-item open" : "sidebar-item"}>
                <div className="sidebar-title">
                    <span>
                        { item.icon && <i className={item.icon}></i> }
                        {item.title}    
                    </span> 
                    <i className="bi-chevron-down toggle-btn" onClick={() => setOpen(!open)}></i>
                </div>
                <div className="sidebar-content">
                    { item.childrens.map((child, index) => <SideBarMain key={index} item={child} />) }
                </div>
            </div>
        )
    }else{
        return (
            <Link to={item.path || "#"} className="sidebar-item plain">
                { item.icon && <i className={item.icon}></i> }
                {item.title !== 'Log-In' ?  item.title : loggedUser.user ? "Log-Out" : "Log-In"}
            </Link>
        )
    }
}