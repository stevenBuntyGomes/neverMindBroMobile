import axios from "axios";
import {API} from '../config'
import AsyncStorage from "@react-native-async-storage/async-storage";


export const emailContactForm = (name, email, message, authorEmail) => async (dispatch) => {
     try{
        dispatch({type: "makeContactRequest"});
        let emailEndpoint;
        if(authorEmail){
            emailEndpoint = `${API}/form/contact-blog-author`;
        }else{
            emailEndpoint = `${API}/form/contact`;
        }
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        };
        const token = await AsyncStorage.getItem('@token');
        const {data} = await axios.post(`${emailEndpoint}`, {name, email, message, token}, config);
        dispatch({
            type: "makeContactSuccess",
            payload: data,
        });
     }catch(error){
        dispatch({
            type: "makeContactFailure",
            payload: "contact error",
        });
     }
}