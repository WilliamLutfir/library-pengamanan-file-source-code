document.base64Char="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
document.UlangKunci=function(strKunci,n){
    let strHasil="", indeks=0;
    for (let i=0 ; i<n ; i+=1){
        if(indeks>=strKunci.length){ indeks=0; }
        strHasil+=strKunci.charAt(indeks);
        indeks+=1;
    }return strHasil.split("");
}

document.SubsDgnTabelBase64=function(arr){
    let arrHasil=[];
    for (let i=0 ; i<arr.length ; i+=1){
        arrHasil.push((document.base64Char).indexOf(arr[i]));
    }return arrHasil;
}

document.RumusEnkripDanDekripBeaufort=function(arrPlaintext,arrKunci){
    let arrHasil=[];
    for (let i=0 ; i<arrPlaintext.length ; i+=1){
        let calcRumusBeaufort=(arrKunci[i] - arrPlaintext[i])%64;
        if(calcRumusBeaufort >= 0){
            arrHasil.push(calcRumusBeaufort);
        }else{
            arrHasil.push((calcRumusBeaufort+64)%64);
        }
    }return arrHasil;
}

document.RumusEnkripsiVigenere=function(arrCiphertext1,arrKunci){
    let arrHasil=[];
    for (let i=0 ; i<arrCiphertext1.length ; i+=1){
        arrHasil.push( (arrCiphertext1[i] + arrKunci[i])%64 );
    }return arrHasil;
}

document.RumusDekripsiVigenere=function(arrCiphertext2,arrKunci){
    let arrHasil=[];
    for (let i=0 ; i<arrCiphertext2.length ; i+=1){
        let calcDekripVigenere=(arrCiphertext2[i] - arrKunci[i])%64;
        if(calcDekripVigenere >= 0){
            arrHasil.push(calcDekripVigenere);
        }else{
            arrHasil.push((calcDekripVigenere+64)%64);
        }
    }return arrHasil;
}

document.AngkaKeBase64Char=function(arr){
    let arrHasil=[];
    for (let i=0 ; i<arr.length ; i+=1){
        arrHasil.push((document.base64Char).charAt(arr[i]));
    }return arrHasil;
}

document.RunBase64Encrypted=function(strBase64Encrypted,strKey1,strKey2){
    // Tahap Dekripsi Vigenere
    let arrCiphertext2=strBase64Encrypted.split("");
    let kunciV=document.UlangKunci((strKey2),(arrCiphertext2.length));
    let ciphertext2TelahDiSubs=document.SubsDgnTabelBase64(arrCiphertext2);
    let kunciVtelahDiSubs=document.SubsDgnTabelBase64(kunciV);
    let dekripsiV=document.RumusDekripsiVigenere(ciphertext2TelahDiSubs,kunciVtelahDiSubs);
    let ciphertext1=document.AngkaKeBase64Char(dekripsiV);
    // Tahap Dekripsi Beaufort
    let kunciB=document.UlangKunci((strKey1),(ciphertext1.length));
    let ciphertext1TelahDiSubs=document.SubsDgnTabelBase64(ciphertext1);
    let kunciBtelahDiSubs=document.SubsDgnTabelBase64(kunciB);
    let dekripsiB=document.RumusEnkripDanDekripBeaufort(ciphertext1TelahDiSubs,kunciBtelahDiSubs);
    let arrBase64Str=document.AngkaKeBase64Char(dekripsiB);
    let base64Str=arrBase64Str.join("");
    return atob(base64Str);
}
