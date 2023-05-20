
function addProduct(event) {
    event.preventDefault();
    let sp = document.getElementById("sp").value;
    let product = document.getElementById("product").value;

    let productDetail = {
        productname: product,
        sellingprice: sp
    }

    axios.post("https://crudcrud.com/api/be2cef7636ba4a62b452b32068ce83b7/product", productDetail)
        .then(() => {
            getDetail();
        })

}

function deleteFromServer(uniqId) {
    axios.delete(`https://crudcrud.com/api/be2cef7636ba4a62b452b32068ce83b7/product/${uniqId}`)
        .then(() => {
            getDetail();
        })


}

function getDetail() {
    axios.get("https://crudcrud.com/api/be2cef7636ba4a62b452b32068ce83b7/product")
        .then((res) => {
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

                deletebtn.onclick = (event) => {
                    event.preventDefault();
                    deleteFromServer(uniqId);
                    listItem.removeChild(li);
                    sum = sum - Number(res.data[i].sellingprice);
                }
                li.appendChild(deletebtn);
                listItem.appendChild(li);

                document.getElementById("sp").value = "";
                document.getElementById("product").value = "";

            }
            updateSum(sum);
        })


}
window.addEventListener("DOMContentLoaded", getDetail);


function updateSum(sum) {

    let sumDiv = document.getElementById('sum-div');
    sumDiv.textContent = `Total Value worth of Products: ${sum}`;
}
