
// List of regex for date

TANGGAL_REGEX = /(0[1-9]|[1-2][0-9]|[0-1])/
BULAN_REGEX = /(0[1-9]|1[0-2]|^(?:[Jj]an(?:uari)?|[Ff]eb(?:ruari)?|[Mm]ar(?:et)?|[Aa]pr(?:il)?|[Mm]ei|[Jj]uni?|[Jj]uli?|[Aa]gu(?:stus)?|[Ss]ep(?:tember)?|[Oo]kt(?:ober)?|[Nn]ov(?:ember)?|[Dd]es(?:ember)?)$)/
TAHUN_REGEX = /([0-9]{4})/
TANGGAL_DELIMITER = /[-/ ]/

JAN_REGEX = /(?:[Jj]an(?:uari)?)/;
FEB_REGEX = /(?:[Ff]eb(?:ruari)?)/;
MAR_REGEX = /(?:[Mm]ar(?:et)?)/;
APR_REGEX = /(?:[Aa]pr(?:il)?)/;
MEI_REGEX = /(?:[Mm]ei)/;
JUN_REGEX = /(?:[Jj]un(?:i)?)/;
JUL_REGEX = /(?:[Jj]ul(?:i)?)/;
AGS_REGEX = /(?:[Aa]gu(?:stus)?)/;
SEP_REGEX = /(?:[Ss]ep(?:tember)?)/;
OKT_REGEX = /(?:[Oo]kt(?:ober)?)/;
NOV_REGEX = /(?:[Nn]ov(?:ember)?)/;
DES_REGEX = /(?:[Dd]es(?:ember)?)/;

REGEX_TANGGAL = /(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/([0-9]{4})/

function pisahinQuery(query){
    newQ = query.split(" ");
    tanggal = "";
    strPenyakit = "";
    arr = [];
    for(let i = 0; i < newQ.length ; i++){
        if(TANGGAL_REGEX.test(newQ[i])){
            arr.push(1);
        }else if(BULAN_REGEX.test(newQ[i])){
            arr.push(1);
        }else if(TAHUN_REGEX.test(newQ[i])){
            arr.push(1);
        }else{
            arr.push(0);
        }
    }
    if(arr.includes(1)){
        strTanggal = "";
        for(let j = 0; j < arr.length ; j++){
            if(arr[j] == 1){
                strTanggal += newQ[j] + " ";
            }else{
                strPenyakit += newQ[j] + " ";
            }
        }
        tanggal = pisahinTanggal(strTanggal);
    }else{
        tanggal = -1;
        for(let j = 0; j < arr.length ; j++){
            strPenyakit += newQ[j] + " ";
        }
    }
    if(strPenyakit[strPenyakit.length-1] == " "){
        strPenyakit = strPenyakit.substring(0, strPenyakit.length - 1);
    }
    if(!REGEX_TANGGAL.test(tanggal)){
        tanggal = -1;
    }
    return [tanggal, strPenyakit];
}

function pisahinTanggal(tanggal){
    tanggalList = tanggal.split(TANGGAL_DELIMITER);
    if(tanggalList[1].length > 2){
        if(JAN_REGEX.test(tanggalList[1])){
            tanggalList[1] = "01";
        }else if(FEB_REGEX.test(tanggalList[1])){
            tanggalList[1] = "02";
        }else if(MAR_REGEX.test(tanggalList[1])){
            tanggalList[1] = "03";
        }else if(APR_REGEX.test(tanggalList[1])){
            tanggalList[1] = "04";
        }else if(MEI_REGEX.test(tanggalList[1])){
            tanggalList[1] = "05";
        }else if(JUN_REGEX.test(tanggalList[1])){
            tanggalList[1] = "06";
        }else if(JUL_REGEX.test(tanggalList[1])){
            tanggalList[1] = "07";
        }else if(AGS_REGEX.test(tanggalList[1])){
            tanggalList[1] = "08";
        }else if(SEP_REGEX.test(tanggalList[1])){
            tanggalList[1] = "09";
        }else if(OKT_REGEX.test(tanggalList[1])){
            tanggalList[1] = "10";
        }else if(NOV_REGEX.test(tanggalList[1])){
            tanggalList[1] = "11";
        }else if(DES_REGEX.test(tanggalList[1])){
            tanggalList[1] = "12";
        }
    }
    return(tanggalList[0] + "/" + tanggalList[1] + "/" + tanggalList[2]);
}

function count1s(arr){
    counter = 0;
    for(let i = 0; i < arr.length; i++){
        if(arr[i] == 1){
            counter++;
        }
    }
    return counter;
}

function isDNAValid(dna){
    return (/^[AGCT]+$/).test(dna);
}

function KMPMatching(dna, disease){
    n = dna.length;
    m = disease.length;

    fail = FailTable(disease);

    i = 0;
    j = 0;
    while(i<n){
        if(disease[j] == dna[i]){
            if(j==m-1){
                return true;
            }
            i++;
            j++;
        } else if(j > 0){
            j = fail[j-1];
        }else{
            i++;
        }
    }
    return false;
}

function FailTable(disease){
    fail = new Array(disease.length);
    fail[0] = 0;

    m = disease.length;
    j = 0;
    i = 1;
    while(i < m){
        if(disease[j] == disease[i]){
            fail[i] = j+1;
            i++;
            j++;
        }else if(j > 0){
            j = fail[j-1];
        }else{
            fail[i] = 0;
            i++;
        }
    }
    return fail;
}

function BMMatching(dna, disease){
    n = dna.length;
    m = disease.length;
    i = m-1;
    last = lastTable(disease);

    if(i > n-1){
        return -1;
    }
    j = m-1;
    do{
        if(disease[j] == dna[i]){
            if(j==0){
                return true;
            }else{
                i--;
                j--;
            }
        }else{
            lastOcc = last[dna[i]];
            i = i + m -Math.min(j, 1+lastOcc);
            j = m-1;
        }
    }while(i <= n-1);
    return false;
}

function lastTable(disease){
    last = new Array;
    for(i = 0; i < disease.length; i++){
        last[disease[i]] = i;
    }
    return last;
}

module.exports = {isDNAValid, KMPMatching, BMMatching, pisahinQuery};