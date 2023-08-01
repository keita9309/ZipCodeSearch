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
                // selectタグの中身を初期化(削除)
                $('#td-select-address option').remove();
                // 配列の要素数が2件以上の場合、セレクトボックスを表示
                if (addressArray.length >= 2) {
                    // selectタグを表示
                    $("#select-address").show();
                    // テキストの中身を初期化
                    $("#select").show();
                    for (let i = 0; i < addressArray.length; i++) {
                        // テキストの中身は最初に取得した値をセット
                        document.getElementById("td1-address").value = addressArray[0];
                        // selectタグを取得する
                        let td_select = document.getElementById("td-select-address");
                        // optionタグを作成する
                        let option = document.createElement("option");
                        // optionタグのテキストに取得した住所を設定する
                        option.text = addressArray[i];
                        // optionタグのvalueに取得した住所を設定する
                        option.value = addressArray[i];
                        // selectタグの子要素にoptionタグを追加する ※後に記述した方に上書きされる（後の方の一箇所にしか反映されない）
                        td_select.appendChild(option);
                        
                    }
                // 配列の要素数が1件の場合
                } else {
                    // $("#select").hide();
                    $("#select-address").hide();
                    
                    // document.getElementById( "address" ).value = recordOfAddress;
                    document.getElementById( "td1-address" ).value = recordOfAddress;
                    
                }
                
            }
        });
    });
});

// selectタグで選択された住所をテキストに追加
function setAddress() {
let td_select = document.querySelector('[name="td-addrres"]');
// console.log(addressArray[td_select.selectedIndex]);
// console.log(addressArray);
// console.log(td_select.selectedIndex);
  document.getElementById( "td1-address" ).value = addressArray[td_select.selectedIndex];
}
