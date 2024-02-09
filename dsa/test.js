function find_permutation(S) {
    let ans = [];

    function BT(ip, op) {
        if (ip.length === 0) {
            ans.push(op);
            return;
        }
        for (let i = 0; i < ip.length; i++) {
            if (ip.substring(0, i).indexOf(ip[i]) === -1) {
                let newIP = ip.substring(0, i) + ip.substring(i + 1);
                let newOp = op + ip[i];
                BT(newIP, newOp);
            }
        }
    }

    BT(S.split('').sort().join(''), '');
    return ans;
}

console.log(find_permutation("ABB"));