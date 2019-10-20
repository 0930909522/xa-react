const urlNode = "https://node.aiday.org/sbir/";
// const urlNode = "http://192.168.50.103/sbir/";
const error1 = '登入逾期，請重新登入';  // 401，key 過期
const error2 = '發生錯誤，請稍後再試';  //500，伺服器錯誤

// 註冊
export const register = async (postData) => {
    let data;
    await fetch(urlNode + 'signup', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(postData)
    })
        .then(response => response.json())
        .then(response => {
            switch (response.status) {
                case 1:
                    window.location.href = '/signup/Verification?' + postData.email;
                    break;
                case 2:
                    data = '電子信箱重覆';
                    break;
                default:
                    console.log(response);
                    break;
            }
        })
        .catch(err => {
            console.log(err);
            data = error2;
        })
    return data;
}

// Website - 查詢追蹤網站
export const trackingList = async () => {
    let data;
    await fetch(urlNode + 'website', {
        // await fetch('http://192.168.50.103/sbir/website', {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
        .then(response => {
            detectStatusCode(response);
            return response.json();
        })
        .then(response => {
            data = response || [];
        })
        .catch(err => {
            console.log(err);
            if (err.message === '401') {
                data = error1;
            } else {
                data = error2;
            }
        })
    return data;
}

// 登入
export const login = async postData => {
    let data;
    await fetch(urlNode + 'signin', {
        // fetch('http://192.168.50.103/sbir/signin', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'

        },
        body: JSON.stringify(postData)
    })
        .then(response => response.json())
        .then(response => {
            switch (response.status) {
                case 2:
                    data = '帳號不正確';
                    return;
                case 3:
                    data = '密碼不正確';
                    return;
                default:
                    if (!response.verified) {
                        //如果未認證
                        data = '請先至信箱認證';
                        return;
                    }
                    localStorage.setItem('name', response.name);
                    data = response;
            }
        })
        .catch(err => {
            data = error2;
            console.log(err);
        })
    await trackingList()
        // 載入追蹤列表
        .then(response => {

            let storeWebsite = [];
            response.forEach((val, index) => {
                storeWebsite.push({
                    siteName: val.siteName,
                    websiteId: val.websiteId
                });
            })
            localStorage.setItem('view', storeWebsite[0].websiteId);
            localStorage.setItem('website', JSON.stringify(storeWebsite));
        })
        .catch(err => {
            console.log(err);
        })
    return data;
}

// 登出
export const logout = postData => {
    fetch(urlNode + 'signout', {
        // fetch('http://192.168.50.103/sbir/signout', {
        method: 'DELETE',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .catch(err => {
            console.log(err);
        })
}

//Password
export const updatePsd = async (postData) => {
    let data;
    await fetch(urlNode + 'password', {
        // await fetch('http://192.168.50.103/sbir/password', {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(postData)
    })
        .then(response => response.json())
        .then(response => {
            data = forAjax(response);
        })
        .catch(err => {
            console.log(err);
        })
    return data;
}


// Website - 新增追蹤網站
export const addTracking = async (postData) => {
    let data;
    await fetch(urlNode + 'website', {
        // await fetch('http://xa.aiday.org/sbir/website', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(postData)
    })
        .then(response => {
            detectStatusCode(response);
            return response.json();
        })
        .then(response => {
            data = forAjax(response);
            console.log(response, data)
        })
        .catch(err => {
            console.log(err);
            if (err.message === '401') {
                data = error1;
            } else {
                data = error2;
            }
        })
    return data;
}

// Website - 修改追蹤網站
export const modifyTracking = async (postData) => {
    let data;
    await fetch(urlNode + 'website', {
        // await fetch('http://192.168.50.103/sbir/website', {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(postData)
    })
        .then(response => {
            detectStatusCode(response);
            return response.json();
        })
        .then(response => {
            data = forAjax(response);
        })
        .catch(err => {
            console.log(err);
            if (err.message === '401') {
                data = error1;
            } else {
                data = error2;
            }
        })
    return data;
}

// export const deleteTracking = async (postData) => {
//     let data;
//     await fetch(urlNode + 'website', {
//         method: 'DELETE',
//         mode: 'cors',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         body: JSON.stringify(postData)
//     })
//         .then(response => response.json())
//         .then(response => {
//             data = forAjax(response);
//         })
//         .catch(err => {
//             console.log(err);
//         })
//     return data;
// }

// Brand - 查詢品牌
// 第二階段選擇黑名單項目和接收
export const pushpage = async postData => {
    let data;
    await fetch(urlNode + 'brand/' + postData, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(response => {
            detectStatusCode(response);
            return response.json();
        })
        .then(response => {
            data = response || [];
        }).catch(err => {
            console.log(err);
            data = [];
        })
    return data;
}

// Board - 新增放進來
// 選擇黑名單後送出
export const setblacklist = async postData => {
    let data;
    await fetch(urlNode + 'board', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(postData)
    })
        .then(response => {
            detectStatusCode(response);
            return response.json();
        })
        .then(response => {
            data = response;
        }).catch(err => {
            console.log(err);
            if (err.message === '401') {
                data = error1;
            } else {
                data = error2;
            }
        })
    return data;
}

// 查詢放進來widget
export const getBoard = async postData => {
    let data;
    let esc = encodeURIComponent;
    let query = Object.keys(postData).map(val => esc(val) + '=' + esc(postData[val])).join('&');
    await fetch(urlNode + 'board?' + query, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'credentials': 'include'
        },
    })
        .then(response => {
            detectStatusCode(response);
            return response.json();
        })
        .then(response => {
            data = response || [];
        })
        .catch(err => {
            console.log(err);
            if (err.message === '401') {
                data = error1;
            } else {
                data = error2;
            }
        })
    return data;
}

// 修改放進來widget
export const modifyBoard = async postData => {
    let data;
    await fetch(urlNode + 'board', {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(postData)
    })
        .then(response => {
            detectStatusCode(response);
            return response.json();
        })
        .then(response => {
            data = response;
        }).catch(err => {
            console.log(err);
            if (err.message === '401') {
                data = error1;
            } else {
                data = error2;
            }
        })
    return data;
}

// 刪除放進來widget
export const deleteBoard = async postData => {
    let data = [];
    await fetch(urlNode + 'board', {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(postData)
    }).catch(err => {
        console.log(err);
    })
    return data;
}

// User - 查詢用戶資訊
export const getUserInfo = async () => {
    let data;
    await fetch(urlNode + 'user', {
        // await fetch('http://192.168.50.103/sbir/user', {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(response => {
            detectStatusCode(response);
            return response.json();
        })
        .then(response => {
            data = response;
        })
        .catch(err => {
            console.log(err);
            data = Promise.reject();
        })
    return data;
}

// User - 修改用戶資訊
export const updateUserInfo = async postData => {
    let data;
    await fetch(urlNode + 'user', {
        // await fetch('http://192.168.50.103/sbir/user', {
        method: 'PUT',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(postData)
    })
        .then(response => {
            detectStatusCode(response);
            return response.json();
        })
        .then(response => {
            data = response;
        }).catch(err => {
            console.log(err);
            if (err.message === '401') {
                data = error1;
            } else {
                data = error2;
            }
        })
    return data;
}

// 推出去查詢
export const getPush = async postData => {
    let data;
    let esc = encodeURIComponent;
    let query = Object.keys(postData).map(val => esc(val) + '=' + esc(postData[val])).join('&');
    await fetch(urlNode + 'ad?' + query, {
        // await fetch('http://192.168.50.103/sbir/ad?'+query,{
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
    })
        .then(response => {
            detectStatusCode(response);
            return response.json();
        })
        .then(response => {
            data = response || [];
        })
        .catch(err => {
            console.log(err);
            data = [];
        })
    return data;
}
// 推出去新增
export const sendPush = async postData => {
    let data;
    await fetch(urlNode + 'ad', {
        // await fetch('http://192.168.50.103/sbir/ad', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(postData)
    })
        .then(response => {
            detectStatusCode(response);
            return response.json();
        })
        .then(response => {
            data = response.status;
        })
        .catch(err => {
            console.log(err);
            if (err.message === '401') {
                data = error1;
            } else {
                data = error2;
            }
        })
    return data;
}

// 推出去修改
export const modifyPush = async postData => {
    let data;
    await fetch(urlNode + 'ad', {
        // await fetch('http://192.168.50.103/sbir/ad', {
        method: 'PUT',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(postData)
    })
        .then(response => {
            detectStatusCode(response);
            return response.json();
        })
        .then(response => {
            data = response.status;
        })
        .catch(err => {
            console.log(err);
            if (err.message === '401') {
                data = error1;
            } else {
                data = error2;
            }
        })
    return data;
}

// 推出去刪除
export const deletePush = async postData => {
    let data;
    await fetch(urlNode + 'ad', {
        // await fetch('http://192.168.50.103/sbir/ad', {
        method: 'DELETE',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(postData)
    })
        .then(response => {
            detectStatusCode(response);
            return response.json();
        })
        .then(response => {
            data = response.status;
        }).catch(err => {
            console.log(err);
            if (err.message === '401') {
                data = error1;
            } else {
                data = error2;
            }
        })
    return data;
}

//推出去時貼上網址抓圖片
export const getPushPt = async postData => {
    let data;
    let defaultImg = '';
    let view = localStorage.getItem('view');
    await fetch(urlNode + 'page/' + view + '?u=' + postData, {
        // await fetch('http://192.168.50.103/sbir/page/' + view + '?u=' + postData, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    }).then(response => response.json()
    ).then(response => {
        if (!response) {
            //若沒資料，給預設圖片
            data = defaultImg;
        } else {
            data = response.img;
        }
    }).catch(err => {
        console.log(err);
        data = defaultImg;
    })
    return data;
}

// 查詢推出去狀態
export const pushStatus = async () => {
    let data;
    let view = localStorage.getItem('view');
    await fetch(urlNode + 'ad/status?view=' + view, {
        // await fetch('http://192.168.50.103/sbir/ad/status?view=' + view, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    })
    .then(response => {
        detectStatusCode(response);
        return response.json();
    })
    .then(response => {
        data = response || {};
    })
    .catch(err => {
        console.log(err);
        data = {};
    })
    return data;
}

// 修改推出去狀態
export const modifyPushStatus = async postData => {
    let data;
    await fetch(urlNode + 'ad/status', {
        // await fetch('http://192.168.50.103/sbir/ad/status', {
        method: 'PUT',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => {
        detectStatusCode(response);
        return response.json();
    })
    .then(response => {
        data = response.status;
    }).catch(err => {
        console.log(err);
    })
    return data;
}

// 查詢推播收益餘額
//查詢帳戶總收入與支出
export const bill = async () => {
    let data;
    await fetch(urlNode + 'user/balance', {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    })
    .then(response => {
        detectStatusCode(response);
        return response.json();
    })
    .then(response => {
        data = response || [];
    }).catch(err => {
        console.log(err);
        data = [];
    })
    return data;
}

//數據儲值
export const addValueMem = async postData => {
    let data;
    await fetch(urlNode + 'user/deposit/member', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => {
        detectStatusCode(response);
        return response.json();
    })
    .then(response => {
        console.log(response);
        data = response.status;
    }).catch(err => {
        console.log(err);
        if (err.message === '401') {
            data = error1;
        } else {
            data = error2;
        }
    })
    return data;
}

//推播儲值
export const addValuePush = async postData => {
    let data;
    await fetch(urlNode + 'user/deposit/push', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => {
        detectStatusCode(response);
        return response.json();
    })
    .then(response => {
        data = response.status;
    }).catch(err => {
        console.log(err);
        if (err.message === '401') {
            data = error1;
        } else {
            data = error2;
        }
    })
    return data;
}

//收益明細
export const myPull = async (postData) => {
    let data;
    await fetch(urlNode + 'user/paymentFlow/pull?yyyymm=' + postData, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    })
    .then(response => {
        detectStatusCode(response);
        return response.json();
    })
    .then(response => {
        data = response || [];
    }).catch(err => {
        console.log(err);
        data = [];
    })
    return data;
}

//推播明細
export const myPush = async (postData) => {
    let data;
    await fetch(urlNode + 'user/paymentFlow/push?yyyymm=' + postData, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    })
    .then(response => {
        detectStatusCode(response);
        return response.json();
    })
    .then(response => {
        data = response || [];
    }).catch(err => {
        console.log(err);
        data = [];
    })
    return data;
}


function forAjax(response) {
    let newData;
    switch (response.status) {
        case 2:
        case 3:
            newData = '此筆資料已註冊';
            break;
        default:
            newData = response;
            break;
    }
    return newData;
}

function detectStatusCode(response) {
    if (response.status === 401) {
        throw new Error('401');
    }
    if (response.status === 500 || !response.ok) {
        throw new Error('500');
    }
}