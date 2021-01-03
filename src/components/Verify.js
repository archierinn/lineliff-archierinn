import Axios from "axios";
import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FormContext } from "../provider/FormProvider";

const axiosLine = Axios.create({
    baseURL: "https://api.line.me/oauth2/v2.1/"
});

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const Verify = () => {
    const query = useQuery();
    const { history } = useContext(FormContext);

    useEffect(() => {
        if (query.get("code")) {
            const body = {
                grant_type: "authorization_code",
                code: query.get("code"),
                redirect_uri: "https://lineliff-archierinn.herokuapp.com/verify",
                client_id: process.env.REACT_APP_LINE_CLIENT_ID,
                client_secret: process.env.REACT_APP_LINE_CLIENT_SECRET
            }
            axiosLine.post("/token", null, { headers: { "Content-Type" : "application/x-www-form-urlencoded"}, params: body}).then((res) => {
                // sessionStorage.setItem("token", res.data.access_token)
                if (res.status === 200) {
                return axiosLine.get("/verify", { params: { access_token: res.data.access_token }}).then((resp) => {
                        if (resp.status === 200) {
                            history.push("/order");
                        }
                        return true
                    })
                }
                return true
            }).catch((err) => console.log(err))
        } else {
            //window.location.href("https://lineliff-archierinn.herokuapp.com/order");
            history.push("/order");
        }
    }, []);
    return (
        <>
        </>
    )
}

export default Verify;