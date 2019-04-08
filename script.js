//resultA/resultB/resultC
let everytype = {
    resultA: '',
    resultB: '',
    resultC: '',
}



//everystep =  [{},{},{}]
let step = [{
        one: "step(A)1",
        two: "step(A)2",
        three: "step(A)3",
        four: "step(A)4",
        five: "step(A)5",
    },
    {
        one: "step(B)1",
        two: "step(B)2",
        three: "step(B)3",
        four: "step(B)4",
        five: "step(B)5",
    },
    {
        one: "step(C)1",
        two: "step(C)2",
        three: "step(C)3",
        four: "step(C)4",
        five: "step(C)5",
        six: "step(C)6",
    }
]

//bookdata = [[],[]],[]]
let bookdata = [
    [{
            name: "惡搞也能出頭天：Action！網路短劇天團這群人TGOP的幕後奇想、技藝、創作實驗室",
            author: "這群人TGOP",
            img: "https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/072/88/0010728840.jpg&v=57cfec46&w=348&h=348",
            link_book: "https://www.books.com.tw/products/0010728840?loc=P_003_001",
            intro: "就著進明深的來發漸過大習便演愛開們講此明城查人利球大賽的會白理中不意，如確自國與了現千在事只是就感業創城老，費親如收的素國回，一陽育小程配製！親構腳不"
        },
        {
            name: "寫字的力量限量超值套組：《寫字的力量》+《美字基本功》(加贈日本原裝Preppy本格鋼筆+專屬炫彩墨水2入)",
            author: "侯信永",
            img: "https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/070/99/0010709943_b_01.jpg&v=56eaa353&w=348&h=348",
            link_book: "https://www.books.com.tw/products/0010709943?loc=P_003_002",
            intro: "構腳不從文意都小大女用買想續臺是議英冷人手千公多地們了度長議然新食班二取隊來，唱看世器化速是人非？"
        }
    ],
    [{
            name: "好音樂的科學：破解基礎樂理和美妙旋律的音階秘密",
            author: "約翰‧包威爾",
            img: "https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/071/87/0010718777.jpg&v=5756a26b&w=348&h=348",
            link_book: "https://www.books.com.tw/products/0010718777?loc=P_003_003",
            intro: "的起下老叫能的夠數好象國費減自三記看寫營微人公結實，形老坐藥全友？強共但屋當放往；不技以行離！品"
        },
        {
            name: "Design by wangzhihong.com：A Selection of Book Designs, 2001-2016(王志弘作品選2001-2016)",
            author: "王志弘",
            img: "https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/072/55/0010725522.jpg&v=57b6fbcb&w=348&h=348",
            link_book: "https://www.books.com.tw/products/0010725522?loc=P_003_004",
            intro: "懷樂接房、日去一解修元再車離們都那線夫平充球外境理士才小，一強構運！外相沒經於手片著放"
        }

    ],
    [{
            name: "手寫英文書法聖經：從握筆、筆順到數字、符號，全方位掌握藝術美字書寫技法。",
            author: "Julien Chazal",
            img: "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/071/98/0010719843.jpg&v=57c7bcda&w=348&h=348",
            link_book: "https://www.books.com.tw/products/0010719843?loc=P_003_005",
            intro: "原問的巴孩德態行共裝片程空？後生夠子國子為多去臺的子情學個高計史友處以稱"
        },
        {
            name: "Typography 字誌：Issue 02 來做LOGO吧！",
            author: "Graphic社編輯部",
            img: "https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/072/92/0010729204.jpg&v=57e27d49&w=348&h=348",
            link_book: "https://www.books.com.tw/products/0010729204?loc=P_003_007",
            intro: "習小西此國買的賽春一類外便房族，行的便印廣臺是父著時斷作是我在和無孩不因性麼話人"
        }
    ],
]



function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

var vm = new Vue({
    el: '#app',
    data: function () {
        return {
            questions: '',
            result: everytype, //A,B,C
            type: '', //測驗結果 A
            steps: '',
            books: ''
        }
    },
    created() {
        axios
            .get('quest.json')
            .then(val => {
                this.questions = val.data
            })

    },
    computed: {

    },
    methods: {
        settlement: function () {

            var ans = true;
            //檢查每一個選項是不是都有選擇到了，並且設定回原本
            this.questions.forEach(function (val) {
                if (val.selected == null) {
                    ans = false;
                }
            });

            //計算三個屬性的大小
            if (ans) {
                var totalA = 0;
                var totalB = 0;
                var totalC = 0;
                this.questions.forEach(function (val) {
                    if (val.selected === "A") {
                        totalA++;
                    } else if (val.selected === "B") {
                        totalB++;
                    } else {
                        totalC++;
                    }
                });
                this.result.resultA = totalA;
                this.result.resultB = totalB;
                this.result.resultC = totalC;
            } else {
                alert('你尚未完成所有問題');
            }

            this.mostbig();
            this.SwitchType(this.type.substring(6));


        },
        //找到最大值
        mostbig: function () {
            let arr = Object.values(this.result);
            let max = Math.max(...arr);

            return this.type = getKeyByValue(this.result, max);
        },

        //計算每一個type的時候
        // sum: function (type) {
        //     // let total = 0;
        //     // this.questions.forEach(function (val) {
        //     //     if (val.selected === type.substring(6))
        //     //         total++;
        //     // });
        //     this.result[1] = 10;
        //     console.log(this.result[1]);
        // },
        //跟據測驗結果，把資料庫的內容設定只有最高值的書本跟步驟
        SwitchType: function (type) {
            var everytypes = ["A", "B", "C"];
            for (let i = 0; i < everytypes.length; i++) {
                if (everytypes[i] === type) {
                    this.books = bookdata[i];
                    this.steps = step[i];
                }
            }
        },


        reset: function () {
            this.questions.forEach(function (val) {
                val.selected = null;
            });
        },


        //動態產生ID
        fromId: function (topic, option) {
            return topic + "_" + option
        },
    },
});

Vue.config.devtools = true;