// 註冊

const urlNode = "https://node.aiday.org/sbir/";
// const urlNode = "http://192.168.50.103/sbir/";

export const register = async (postData) => {
    fetch( urlNode + 'signup', {
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
                    alert('電子信箱重覆');
                    break;
                // case 999:
                //     alert('網路繁忙，請稍後再試');
                //     break;
                default:
                    console.log(response);
                    break;
            }
        })
        .catch(err => {
            console.log(err);
        })
}

// Website - 查詢追蹤網站
export const trackingList = async () => {
    let data;
    await fetch( urlNode + 'website', {
        // await fetch('http://192.168.50.103/sbir/website', {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
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

// 登入
export const login = async postData => {
    let data;
    await fetch( urlNode + 'signin', {
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
                    alert('帳號不正確');
                    return;
                case 3:
                    alert('密碼不正確');
                    return;
                default:
                    if (!response.verified) {
                        //如果未認證
                        alert('請先至信箱認證');
                        return;
                    }
                    localStorage.setItem('name', response.name);
                    data = response;

                    if (!response.level) {
                        // 如果level為0
                        localStorage.setItem('visited', '1');
                        return;
                    } else {
                        // level 1 以上，進入基礎數據分析
                        localStorage.setItem('visited', '0');
                    }
            }
        })
        .catch(err => {
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
    return data;
}

// 登出
export const logout = postData => {
    fetch('https://node.aiday.org/sbir/signout', {
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
    await fetch('https://node.aiday.org/sbir/password', {
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
            data = forAjax(response).status;
        })
        .catch(err => {
            console.log(err);
        })
    return data;
}




// Website - 新增追蹤網站
export const addTracking = async (postData) => {
    let data;
    // await fetch('https://node.aiday.org/sbir/website', {
    await fetch('http://xa.aiday.org/sbir/website', {
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
            data = forAjax(response);
        })
        .catch(err => {
            console.log(err);
        })
    return data;
}

// Website - 修改追蹤網站
export const modifyTracking = async (postData) => {
    let data;
    // await fetch('https://node.aiday.org/sbir/website', {
    await fetch('http://192.168.50.103/sbir/website', {
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

// export const deleteTracking = async (postData) => {
//     let data;
//     await fetch('https://node.aiday.org/sbir/website', {
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
    await fetch('https://node.aiday.org/sbir/brand/' + postData, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response => response.json()
    ).then(response => {
        data = forAjax(response);
    }).catch(err => {
        console.log(err);
    })
    return data;
}

// Board - 新增放進來
// 選擇黑名單後送出
export const setblacklist = async postData => {
    let data;
    await fetch('https://node.aiday.org/sbir/board', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(postData)
    }).then(response => response.json()
    ).then(response => {
        data = forAjax(response).boardId;
    }).catch(err => {
        console.log(err);
    })
    return data;
}

// 查詢放進來widget
export const getBoard = async postData => {
    let data;
    let esc = encodeURIComponent;
    let query = Object.keys(postData).map(val => esc(val) + '=' + esc(postData[val])).join('&');
    await fetch('https://node.aiday.org/sbir/board?' + query, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'credentials': 'include'
        },
        // body: JSON.stringify(postData)
    }).then(response => response.json()
    ).then(response => {
        data = forAjax(response);
    }).catch(err => {
        console.log(err);
    })
    return data;
}

// 修改放進來widget
export const modifyBoard = async postData => {
    let data;
    await fetch('https://node.aiday.org/sbir/board', {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(postData)
    }).then(response => response.json()
    ).then(response => {
        forAjax(response);
    }).catch(err => {
        console.log(err);
    })
    return data;
}

// 刪除放進來widget
export const deleteBoard = async postData => {
    let data = [];
    await fetch('https://node.aiday.org/sbir/board', {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(postData)
    }).then(response => response.json()
    ).then(response => {
        response.forEach(val => {
            forAjax(val);
        })
    }).catch(err => {
        console.log(err);
    })
    return data;
}

// User - 查詢用戶資訊
export const getUserInfo = async () => {
    let data;
    await fetch('https://node.aiday.org/sbir/user', {
        // await fetch('http://192.168.50.103/sbir/user', {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        // body: JSON.stringify(postData)
    }).then(response => response.json()
    ).then(response => {
        data = forAjax(response);
    }).catch(err => {
        console.log(err);
    })
    return data;
}

// User - 修改用戶資訊
export const updateUserInfo = async postData => {
    let data;
    await fetch('https://node.aiday.org/sbir/user', {
        // await fetch('http://192.168.50.103/sbir/user', {
        method: 'PUT',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(postData)
    }).then(response => response.json()
    ).then(response => {
        data = forAjax(response);
    }).catch(err => {
        console.log(err);
    })
    return data;
}

// 推出去查詢
export const getPush = async postData => {
    let data;
    let esc = encodeURIComponent;
    let query = Object.keys(postData).map(val => esc(val) + '=' + esc(postData[val])).join('&');
    await fetch('http://node.aiday.org/sbir/ad?' + query, {
        // await fetch('http://192.168.50.103/sbir/ad?'+query,{
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
    }).then(response => response.json()
    ).then(response => {
        data = response;
    }).catch(err => {
        console.log(err);
    })
    return data;
}
// 推出去新增
export const sendPush = async postData => {
    let data;
    await fetch('http://node.aiday.org/sbir/ad', {
    // await fetch('http://192.168.50.103/sbir/ad', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(postData)
    }).then(response => response.json()
    ).then(response => {
        data = response.status;
    }).catch(err => {
        console.log(err);
    })
    return data;
}

// 推出去修改
export const modifyPush = async postData => {
    let data;
    await fetch('http://node.aiday.org/sbir/ad', {
    // await fetch('http://192.168.50.103/sbir/ad', {
        method: 'PUT',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(postData)
    }).then(response => response.json()
    ).then(response => {
        data = response.status;
    }).catch(err => {
        console.log(err);
    })
    return data;
}

// 推出去刪除
export const deletePush = async postData => {
    let data;
    await fetch('http://node.aiday.org/sbir/ad', {
    // await fetch('http://192.168.50.103/sbir/ad', {
        method: 'DELETE',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(postData)
    }).then(response => response.json()
    ).then(response => {
        data = response.status;
    }).catch(err => {
        console.log(err);
    })
    return data;
}

//推出去時貼上網址抓圖片
export const getPushPt = async postData => {
    let data;
    let view = localStorage.getItem('view');
    await fetch('http://node.aiday.org/sbir/page/' + view + '?u=' + postData, {
    // await fetch('http://192.168.50.103/sbir/page/' + view + '?u=' + postData, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    }).then(response => response.json()
    ).then(response => {
        if (!response) {
            //若沒資料，給預設圖片
            data = 'https://cdn.pixabay.com/photo/2017/08/01/08/40/black-and-white-2563584_1280.jpg';
        } else {
            data = response.img;
        }
    }).catch(err => {
        console.log(err);
    })
    return data;
}

// 查詢推出去狀態
export const pushStatus = async () => {
    let data;
    let view = localStorage.getItem('view');
    await fetch('http://node.aiday.org/sbir/ad/status?view='+view, {
    // await fetch('http://192.168.50.103/sbir/ad/status?view=' + view, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    }).then(response => response.json()
    ).then(response => {
        data = response;
    }).catch(err => {
        console.log(err);
    })
    return data;
}

// 修改推出去狀態
export const modifyPushStatus = async postData => {
    let data;
    await fetch('http://node.aiday.org/sbir/ad/status', {
    // await fetch('http://192.168.50.103/sbir/ad/status', {
        method: 'PUT',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(postData)
    }).then(response => response.json()
    ).then(response => {
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
    await fetch('https://node.aiday.org/sbir/user/balance', {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    }).then(response => response.json()
    ).then(response => {
        data = response;
    }).catch(err => {
        console.log(err);
    })
    return data;
}

//會員儲值
export const addValueMem = async postData => {
    let data;
    await fetch('https://node.aiday.org/sbir/user/deposit/member', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(postData)
    }).then(response => response.json()
    ).then(response => {
        console.log(response);
        data = response.status;
    }).catch(err => {
        console.log(err);
    })
    return data;
}

//推播儲值
export const addValuePush = async postData => {
    let data;
    await fetch('https://node.aiday.org/sbir/user/deposit/push', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(postData)
    }).then(response => response.json()
    ).then(response => {
        data = response.status;
    }).catch(err => {
        console.log(err);
    })
    return data;
}

//推播收益
export const myPush = async (postData) => {
    let data;
    await fetch('https://node.aiday.org/sbir/user/paymentFlow/pull?yyyymm='+postData, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    }).then(response => response.json()
    ).then(response => {
        data = response;
    }).catch(err => {
        console.log(err);
    })
    return data;
}


function forAjax(response) {
    let newData;
    switch (response.status) {
        // case 1:
        //     newData = response;
        //     break;
        case 2:
        case 3:
            alert('此筆資料已註冊');
            break;
        // case 999:
        //     alert('無法預期的錯誤');
        //     break;
        default:
            newData = response;
            break;
    }
    return newData;
}