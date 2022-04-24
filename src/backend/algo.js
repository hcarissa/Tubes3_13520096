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

dna = "ATGACGCGAT"
disease = "ACG"
if(isDNAValid(dna)){
    console.log("dna valid");
}else{
    console.log("ga valid");
}