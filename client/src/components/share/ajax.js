export const register = async (postData) => {
    // fetch('https://node.aiday.org/sbir/signup', {
    fetch('http://192.168.50.103/sbir/signup', {
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
                    window.location.href = '/signup/signin';
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

export const login = postData => {
    fetch('https://node.aiday.org/sbir/signin', {
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
                    break;
                case 3:
                    alert('密碼不正確');
                    break;
                default:
                    // localStorage.setItem('token', response.token);
                    localStorage.setItem('name', response.name);
                    if (!response.hasOwnProperty('view')) {
                        // 如果第一次登入
                        localStorage.setItem('visited', '1');
                        window.location.href = '/memberCentre/edit';
                    } else {
                        localStorage.setItem('visited', '0');
                        localStorage.setItem('view', response.view);
                        window.location.href = '/memberCentre/edit';
                    }
                    break;
            }
        })
        .catch(err => {
            console.log(err);
        })
}

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


// Website - 查詢追蹤網站
export const trackingList = async () => {
    let data;
    await fetch('https://node.aiday.org/sbir/website', {
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

// Website - 新增追蹤網站
export const addTracking = async (postData) => {
    let data;
    await fetch('https://node.aiday.org/sbir/website', {
    // await fetch('http://192.168.50.103/sbir/website', {
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
    await fetch('https://node.aiday.org/sbir/website', {
    // await fetch('http://192.168.50.103/sbir/website', {
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
    await fetch('https://node.aiday.org/sbir/brand/'+postData, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response => response.json()
    ).then(response => {
        data = forAjax(response).brandlist;
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
        data = forAjax(response).boardlist;
    }).catch(err => {
        console.log(err);
    })
    return data;
}

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
export const getUserInfo = async postData => {
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

function forAjax(response) {
    let newData;
    switch (response.status) {
        // case 1:
        //     newData = response;
        //     break;
        case 2:
        case 3:
            alert('待機時間過長');
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