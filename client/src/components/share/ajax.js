export const register = async (postData) => {
    fetch('http://192.168.50.103/sbir/user/signup', {
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
                    window.location.href = '/sbir/user/signin';
                    break;
                case 2:
                    alert('電子信箱重覆');
                    break;
                case 999:
                    alert('網路繁忙，請稍後再試');
                    break;
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
    fetch('http://192.168.50.103/sbir/user/signin', {
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
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('name', response.name);
                    if (!response.hasOwnProperty('view')) {
                        // 如果第一次登入
                        localStorage.setItem('visited', '1');
                        window.location.href = '/trackingCode/setting';
                    } else {
                        localStorage.setItem('visited', '0');
                        localStorage.setItem('view', response.view);
                        window.location.href = '/memberCentre/edit';
                    }
                    // window.location.href = '/memberCentre/edit';
                    break;
                case 2:
                    alert('帳號不正確');
                    break;
                case 3:
                    alert('密碼不正確');
                    break;
                case 999:
                    alert('網路繁忙，請稍後再試');
                    break;
                default:
                    console.log(response);
                    break;
            }
        })
        .catch(err => {
            console.log(err);
        })
}

export const trackingList = async (postData) => {
    let data;
    await fetch('http://192.168.50.103/sbir/website/list', {
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
            data = forAjax(response).websitelist;
        })
        .catch(err => {
            console.log(err);
        })
    return data;
}

export const addTracking = async (postData) => {
    let data;
    await fetch('http://192.168.50.103/sbir/website', {
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
            data = forAjax(response);
        })
        .catch(err => {
            console.log(err);
        })
    return data;
}

export const modifyTracking = async (postData) => {
    let data;
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
//     await fetch('http://192.168.50.103/sbir/website', {
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

// 第一階段選擇後送出
export const pushpage = async postData => {
    let data;
    await fetch('http://192.168.50.103/sbir/brand/list', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(postData)
    }).then(response => response.json()
    ).then(response => {
        data = forAjax(response).brandlist;
    }).catch(err => {
        console.log(err);
    })
    return data;
}

// 選擇黑名單送出
export const setblacklist = async postData => {
    let data;
    await fetch('http://192.168.50.103/sbir/board', {
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
    await fetch('http://192.168.50.103/sbir/board/list', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(postData)
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
    await fetch('http://192.168.50.103/sbir/board', {
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
    await fetch('http://192.168.50.103/sbir/board', {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(postData)
    }).then(response => response.json()
    ).then(response => {
        response.forEach(val=>{
            forAjax(val);
        })
    }).catch(err => {
        console.log(err);
    })
    return data;
}

function forAjax(response){
    let newData;
    switch (response.status) {
        case 1:
            newData = response;
            break;
        case 2:
        case 3:
            alert('待機時間過長');
            break;
        case 999:
            alert('無法預期的錯誤');
            break;
        default:
            newData = response;
            console.log(response);
            break;
    }
    return newData;
}