import axios from 'axios';
// export const getUser=()=>{
//     const userStr=sessionStorage.getItem('user');
//     if(userStr) return JSON.parse(userStr);
//     else return null;
// }

export const getToken=()=>{
    return sessionStorage.getItem('token')||null;
}

// export const removeUserSession=()=>{
//     sessionStorage.removeItem('token');
//     sessionStorage.removeItem('user');
// }

// export const setUserSession=(token, user)=>{
//     // console.log(token, user)
//     sessionStorage.setItem('token', token);
//     // tự động logout sau 3 tiếng
//     setTimeout(()=>removeUserSession(), 1000*60*60*3)
// }

// export const postDataToServer=async (link ,data)=>{
//     await axios.post(link,data,{
//         headers:{
//             'Authorization': `Bearer ${getToken()}`
//         }
//     }).then(res=>{
//         alert("Success")
//     }).catch(error=>{
//         alert(error.response.data.message)
//     })
// }
// export const patchDataToServer=async (link ,data)=>{
//     await axios.patch(link,data,{
//         headers:{
//             'Authorization': `Bearer ${getToken()}`
//         }
//     }).then(res=>{
//         alert("Success")
//     }).catch(error=>{
//         alert('Something wrong, try again')
//     })
// }
export const getDataFromServer=async(link)=>{
    let data = await axios.get(process.env.REACT_APP_API_URL+link).then(res=>{
        return res;
    }).catch(error=>
        console.log(error)
        )
    return data
}
export const deleteDataFromServer=async (link)=>{
    await axios.delete(process.env.REACT_APP_API_URL+link).then(res=>{
        console.log(res)
    }).catch(error=>{
        console.log(error)
    })
}

// export const getIdUser=(user)=>{
//     axios.get('//45.119.213.117:5000/api/v1/account/all', {
//         headers:{
//             'Authorization': `Bearer ${getToken()}`,
//           }
//     }).then(res=>res).catch(err=>console.log(err))
// }