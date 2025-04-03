const data = [
    { maDeTai: "KH03", ten: "Đề tài 1", soLuongSVToiThieu: 1, soLuongSVToiDa: 5, trangThai: "Mở", nguoiTao: "Nguyễn Văn A", monHoc: "Môn 1", lop: "D22CQCNT01-N", ngayBatDau: "01/03/2025", ngayKetThuc: "15/03/2025", moTa: "Mô tả đề tài 1" },
    { maDeTai: "KH04", ten: "Đề tài 2", soLuongSVToiThieu: 1, soLuongSVToiDa: 3, trangThai: "Mở", nguoiTao: "Trần Thị B", monHoc: "Môn 2", lop: "D22CQCNT02-N", ngayBatDau: "05/03/2025", ngayKetThuc: "20/03/2025", moTa: "Mô tả đề tài 2" },
    { maDeTai: "KH05", ten: "Đề tài 3", soLuongSVToiThieu: 2, soLuongSVToiDa: 4, trangThai: "Mở", nguoiTao: "Lê Văn C", monHoc: "Môn 3", lop: "D22CQCNT03-N", ngayBatDau: "10/03/2025", ngayKetThuc: "25/03/2025", moTa: "Mô tả đề tài 3" },
    { maDeTai: "KH06", ten: "Đề tài 4", soLuongSVToiThieu: 1, soLuongSVToiDa: 6, trangThai: "Mở", nguoiTao: "Phạm Thị D", monHoc: "Môn 4", lop: "D22CQCNT01-N", ngayBatDau: "12/03/2025", ngayKetThuc: "28/03/2025", moTa: "Mô tả đề tài 4" },
    { maDeTai: "KH07", ten: "Đề tài 5", soLuongSVToiThieu: 1, soLuongSVToiDa: 5, trangThai: "Mở", nguoiTao: "Ngô Văn E", monHoc: "Môn 5", lop: "D22CQCNT02-N", ngayBatDau: "15/03/2025", ngayKetThuc: "30/03/2025", moTa: "Mô tả đề tài 5" },
    { maDeTai: "KH08", ten: "Đề tài 6", soLuongSVToiThieu: 2, soLuongSVToiDa: 4, trangThai: "Mở", nguoiTao: "Đặng Thị F", monHoc: "Môn 6", lop: "D22CQCNT03-N", ngayBatDau: "18/03/2025", ngayKetThuc: "02/04/2025", moTa: "Mô tả đề tài 6" },
    { maDeTai: "KH09", ten: "Đề tài 7", soLuongSVToiThieu: 1, soLuongSVToiDa: 3, trangThai: "Mở", nguoiTao: "Hoàng Văn G", monHoc: "Môn 7", lop: "D22CQCNT01-N", ngayBatDau: "20/03/2025", ngayKetThuc: "05/04/2025", moTa: "Mô tả đề tài 7" }
];


const classes = [
    { value: "ALL", text: "Tất cả" },
    { value: "CNTT1", text: "D22CQCN01-N" },
    { value: "CNTT2", text: "D22CQCN02-N" },
    { value: "CNTT3", text: "D22CQCN03-N" }
];


const subjects = [
    { value: "ALL", text: "Tất cả" },
    { value: "CNPM", text: "Công Nghệ Phần Mềm" },
    { value: "LTW", text: "Lập Trình Web" },
    { value: "LTĐH", text: "Lập Trình ĐH" },
    { value: "CSDL", text: "Cơ Sở Dữ Liệu" }
];



const tableBody1 = document.getElementById("data-table-1");
const selectedTopicInfo = document.getElementById("selected-topic-info");
const selectedTopicText = document.getElementById("selected-topic-text");
const groupInfoForm = document.getElementById("group-info-form");
const subresBtn = document.getElementById("sub-res-button");
const groupInfo = document.getElementById("group-info");
const filterClass = document.getElementById("filter-class");
const filterSubject = document.getElementById("filter-subject");


let selectedTopic = null;

function populateSelect(selectElement, data) {
    selectElement.innerHTML = ""; // Xóa các tùy chọn cũ
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.value;
        option.textContent = item.text;
        selectElement.appendChild(option);
    });
}
populateSelect(filterClass, classes);
populateSelect(filterSubject, subjects);


function renderTable(tableBody, data) {
    tableBody.innerHTML = "";
    data.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <input type="checkbox" id="check-${index}">
            </td>
            <td>${item.maDeTai}</td>
            <td>${item.ten}</td>
            <td>${item.soLuongSVToiThieu}</td> 
            <td>${item.soLuongSVToiDa}</td> 
            <td>${item.trangThai}</td> 
            <td>${item.nguoiTao}</td> 
            <td>${item.monHoc}</td> 
            <td>${item.lop}</td>
            <td>${item.ngayBatDau}</td> 
            <td>${item.ngayKetThuc}</td> 
            <td>${item.moTa}</td> 
            
        `;
        tableBody.appendChild(row);

        const checkbox = document.getElementById(`check-${index}`);
        checkbox.addEventListener('change', () => selectTopic(index));
    });
}

filterClass.addEventListener('change', () => {
    if(filterClass.value){
        filterSubject.disabled = false;
    }else{
        filterSubject.disabled = true;
        filterSubject.value = "";
    }
});

function filterTable() {
    const selectedClass = filterClass.options[filterClass.selectedIndex]?.textContent || ""; 
    const selectedSubject = filterSubject.options[filterSubject.selectedIndex]?.textContent || ""; 
    const filterValue = document.getElementById("filter-code").value.toLowerCase();

    const filteredData = data.filter(item => {
        const matchesClass = !selectedClass || item.lop === selectedClass;
        const matchesSubject = !selectedSubject || item.monHoc === selectedSubject;
        const matchesCode = item.maDeTai.toLowerCase().includes(filterValue);
        return matchesClass || matchesSubject || matchesCode;
    });

    if (filteredData.length === 0) {
        tableBody1.innerHTML = `
            <tr>
                <td colspan="12" style="text-align: center;">Không có dữ liệu phù hợp</td>
            </tr>
        `;
    } else {
        renderTable(tableBody1, filteredData);
    }
}

function selectTopic(index) {
    const checkbox = document.getElementById(`check-${index}`);
    const row = checkbox.parentElement.parentElement;
    const memberFields = document.getElementById("member-fields");
    if (checkbox.checked) {
        selectedTopic = { ...data[index] };
        selectedTopicText.textContent = `Mã: ${selectedTopic.maDeTai}, Tên: ${selectedTopic.ten}, Giảng viên: ${selectedTopic.nguoiTao}`;
        selectedTopicInfo.classList.add("visible");
        groupInfoForm.classList.add("visible");
        subresBtn.classList.add("visible");
        row.classList.add('selected-row');
        memberFields.innerHTML = "";
    } else {
        selectedTopic = null;
        selectedTopicInfo.classList.remove("visible");
        groupInfoForm.classList.remove("visible");
        subresBtn.classList.remove("visible");
        row.classList.remove('selected-row');
        memberFields.innerHTML = "";
        document.getElementById("member-count").value = "";
        document.getElementById("group-name").value = "";
        
    }
}

function updateMemberFields(){
    const memberCount = document.getElementById("member-count").value;
    const memberFields = document.getElementById("member-fields");
    memberFields.innerHTML = "";

    for(let i = 1; i <= memberCount; i++){
        const memberInfo = document.createElement("div");
        memberInfo.classList.add("member-info");

        const label = document.createElement("label");
        label.setAttribute("for", `member-${i}`);
        if (i == 1) {
            label.textContent = `MSSV trưởng nhóm:`;
        } else {
           label.textContent = `MSSV thành viên ${i}:`;
        }
        
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", `member-${i}`);
        input.setAttribute("name", `member-${i}`);
        input.required = true;
        
        memberInfo.appendChild(label);
        memberInfo.appendChild(document.createElement("br"));
        memberInfo.appendChild(input);
        memberFields.appendChild(memberInfo);

    // const columns = Math.ceil(Math.sqrt(memberCount));
    // memberFields.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    }
}


function submitRegistration() {
    if (!selectedTopic) {
        alert("Vui lòng chọn đề tài!");
        return;
    }
    if (!groupInfo.value.trim()) {
        alert("Vui lòng nhập thông tin nhóm!");
        return;
    }
    alert("Đăng ký thành công!\nThông tin đề tài: " + selectedTopicText.textContent + "\nThông tin nhóm: " + groupInfo.value);
}

function resetForm() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.checked = false;
        cb.parentElement.parentElement.classList.remove('selected-row');
    });
    selectedTopic = null;
    selectedTopicInfo.classList.remove("visible");
    selectedTopicText.textContent = "none";
    groupInfoForm.classList.remove("visible");
    subresBtn.classList.remove("visible");
    // groupInfo.value = "";
    const memberFields = document.getElementById("member-fields");
    memberFields.innerHTML = "";
    document.getElementById("member-count").value = "";
    document.getElementById("group-name").value = "";
    
}

document.getElementById('submit-btn').addEventListener('click', submitRegistration);
document.getElementById('reset-btn').addEventListener('click', resetForm);
populateSelect(filterClass, classes);
populateSelect(filterSubject, subjects);
renderTable(tableBody1, data);