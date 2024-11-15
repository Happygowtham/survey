import axiosInstance from "../axiosInstance";

export const sendEmail = (data) => {
    axiosInstance("sendmail/", {
        method: "POST",
        data: {
            to: data.to,
            subject: data.subject,
            email_content: data?.content
        }
    })
}


