// 郵便番号に該当する住所
let addressArray;

$(function() {
    $('#getAddressBtn').on('click', function() {
        let params = {
            "zipcode": $('#zipcode').val()
        };
        $.ajax({
            url: 'getAddress',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify(params),
            dataType: 'json',
            async: false,
            success: function(data) {
                //$("#dispAddress").empty();
                //let dispAddress = document.getElementById("dispAddress");
                //let table = document.createElement("table");

                /*
                table.setAttribute("border", "2");
                table.setAttribute("cellpadding", "15");
                table.setAttribute("style", "margin :15px");
                */

                let recordOfAddress;
                addressArray = new Array();
                //duplicateAddressArray = new Array();

                $(data.results).each(function(index, result) {
                    /*
                    table.appendChild(createRow("郵便番号", result.zipcode));
                    table.appendChild(createRow("都道府県コード", result.prefcode));
                    table.appendChild(createRow("都道府県名", result.address1));
                    table.appendChild(createRow("市区町村名", result.address2));
                    table.appendChild(createRow("町域名", result.address3));
                    table.appendChild(createRow("都道府県名カナ", result.kana1));
                    table.appendChild(createRow("市区町村名カナ", result.kana2));
                    table.appendChild(createRow("町域名カナ", result.kana3));
                    */
                    // 取得した住所を一行に加工
                    recordOfAddress = (result.address1 + result.address2 + result.address3).toString();
                    // 加工した住所を配列に追加
                    addressArray.push(recordOfAddress);
                    // 重複している市区町村名のみ配列に追加
                    // duplicateAddressArray.push((result.address2).toString());
                });
                // 住所の一覧(テーブル)
                // dispAddress.appendChild(table);
                // selectタグの中身を初期化(削除)
                $('#citySelect option').remove();
                // 配列の要素数が2件以上の場合、セレクトボックスを表示
                if (addressArray.length >= 2) {
                    // テキストの中身を初期化
                    document.getElementById( "address" ).value = "";
                    $("#select").show();
                    for (let i = 0; i < addressArray.length; i++) {
                        // selectタグを取得する
                        let select = document.getElementById("citySelect");
                        // optionタグを作成する
                        let option = document.createElement("option");
                        // optionタグのテキストに取得した住所を設定する
                        option.text = addressArray[i];
                        // optionタグのvalueに取得した住所を設定する
                        option.value = addressArray[i];
                        // selectタグの子要素にoptionタグを追加する
                        select.appendChild(option);
                    }
                // 配列の要素数が1件の場合
                } else {
                    $("#select").hide();
                    document.getElementById( "address" ).value = recordOfAddress;
                    
                }
                
            }
        });
    });
});

/*
function createRow(header, value) {
    var tr = document.createElement("tr");
    var th = document.createElement("th");
    th.append(header);
    var td = document.createElement("td");
    td.append(value);
    tr.appendChild(th);
    tr.appendChild(td);
    return tr;
}
*/

// selectタグで選択された住所をテキストに追加
function setAddress() {
let select = document.querySelector('[name="cityName"]');
  document.getElementById( "address" ).value = addressArray[select.selectedIndex];
}