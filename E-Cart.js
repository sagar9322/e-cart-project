async function addProduct(event) {
    event.preventDefault();
    let sp = document.getElementById("sp").value;
    let product = document.getElementById("product").value;

    let productDetail = {
        productname: product,
        sellingprice: sp
    }

    try {
        await axios.post("https://crudcrud.com/api/d5b0b3a65df6489080c9674f2a70598e/product", productDetail)
        getDetail();
    } catch (error) {
        console.error(error);
    }

}

async function deleteFromServer(uniqId) {
    try {
        await axios.delete(`https://crudcrud.com/api/d5b0b3a65df6489080c9674f2a70598e/product/${uniqId}`)
        getDetail();
    } catch (error) {
        console.error(error);
    }


}

async function getDetail() {
    try {
        const res = await axios.get("https://crudcrud.com/api/d5b0b3a65df6489080c9674f2a70598e/product");
        var listItem = document.getElementById('item-list');
        listItem.innerHTML = ""; // Clear the current list
        var sum = 0;
        for (let i = 0; i < res.data.length; i++) {
            const userDetail = res.data[i];
            uniqId = res.data[i]['_id'];
            sum += Number(res.data[i].sellingprice);

            let displayProduct = `Product-Name: ${userDetail.productname}, Selling-Price: ${userDetail.sellingprice}`;

            let li = document.createElement("li");
            li.className = "list-item";
            li.appendChild(document.createTextNode(displayProduct));

            let deletebtn = document.createElement("button");
            deletebtn.className = "delete-btn";
            deletebtn.appendChild(document.createTextNode("Delete Product"));

            function deleteList(li, uniqId, i) {
                return (event) => {
                    event.preventDefault();
                    deleteFromServer(uniqId);
                    listItem.removeChild(li);
                    sum = sum - Number(res.data[i].sellingprice);
                }
            }
            deletebtn.onclick = deleteList(li, uniqId, i);


            li.appendChild(deletebtn);
            listItem.appendChild(li);

            document.getElementById("sp").value = "";
            document.getElementById("product").value = "";

        }
        updateSum(sum);
    } catch (error) {
        console.error(error);
    }


}
window.addEventListener("DOMContentLoaded", getDetail);


function updateSum(sum) {

    let sumDiv = document.getElementById('sum-div');
    sumDiv.textContent = `Total Value worth of Products: ${sum}`;
}
