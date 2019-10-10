import React, { Component } from 'react';

export const htmlInstallTrack = (level, thisLevel) => {
    let html = "";
    switch (true) {
        case (level <= 0):
            html = <div className="box">
                請先於您的網站安裝追蹤碼，感謝您
            </div>;
            break;
        case (thisLevel === 4):
            html = <div className="box">
                請先升級至用戶分析會員，感謝您
            </div>;
            break;
        case (thisLevel === 3):
            html = <div className="box">
                請先升級至資產分析會員，感謝您
            </div>;
            break;
        case (thisLevel === 2):
            html = <div className="box">
                請先升級至健檢會員，感謝您
            </div>;
            break;
    }
    return html;
}

// const storageData = JSON.parse(localStorage.getItem('permission'));

// export const checkPermissionVerified = () => {
//     return storageData ? storageData.verified : "";
// }

// export const checkPermissionName = () => {
//     return storageData ? storageData.name : "";
// }

// export const checkPermissionLevel = () => {
//     return storageData ? storageData.level : "";
// }