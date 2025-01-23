import axios from "axios";

export const Adduser = async (decode) => {
  console.log("Data to send:", decode);

  try {
    const response = await axios.post("http://localhost:9595/add", decode, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("Response from server:", response.data);
  } catch (error) {
    console.error("Error posting data:", error.message);
    if (error.response) {
      console.error("Server response:", error.response.data);
    }
  }
};

export const Getuser = async () => {
  try {
    const response = await axios.get("http://localhost:9595/users");
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const setConverstion = async (data) => {
  try {
    await axios.post("http://localhost:9595/conversation/add", data);
  } catch (error) {
    console.log(error.message);
  }
};

export const getConverstion = async (data) => {
  try {
    const response = await axios.post("http://localhost:9595/conversation/get", data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const NewMessage = async (data) => {
  try {
    await axios.post("http://localhost:9595/message/add", data)
  } catch (error) {
    console.log(error.message);

  }

}

export const GetMessages = async (id) => {
  try {
    const response = await axios.get(`http://localhost:9595/message/get/${id}`)
    return response.data
  } catch (error) {
    console.log(error.message);

  }
}
export const uploadFiled = async (formdata) => {
  console.log("Form being sent:", formdata);

  try {
    const response = await axios.post("http://localhost:9595/file/upload", formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log("File uploaded successfully:", response.formdata);
  } catch (error) {
    console.error("Error uploading file:", error.message);
  }
};
