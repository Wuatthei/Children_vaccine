function loadSupportRequests() {
    const apiBaseUrl = `http://${window.location.hostname}:8080`;
    fetch(`${apiBaseUrl}/api/support`)
      .then(res => res.json())
      .then(data => {
        const tbody = document.getElementById("supportTableBody");
        tbody.innerHTML = "";
  
        data.forEach(req => {
          const row = `
            <tr>
              <td>${req.id}</td>
              <td>${req.name}</td>
              <td>${req.email}</td>
              <td>${req.phone}</td>
              <td>${req.chude}</td>
              <td>${req.douutien}</td>
              <td>${req.tieude}</td>
              <td>${req.chitiet}</td>
             
              <td>${new Date(req.createdAt).toLocaleString()}</td>
               <td>
                <button onclick="xoasupport(${req.id})">Xóa</button>
              </td>

            </tr>
          `;
          tbody.insertAdjacentHTML("beforeend", row);
        });
      })
      .catch(err => {
        console.error("Không thể tải yêu cầu hỗ trợ:", err);
      });
  }
  function xoasupport(id) {
    if (confirm("Bạn có chắc muốn xóa lịch tiêm này không?")) {
      fetch(`${apiBaseUrl}/api/support/${id}`, {
        method: "DELETE"
      })
      .then(res => {
        if (res.ok) {
          alert("Xóa thành công!");
          loadSupportRequests(); 
        } else {
          alert("Xóa thất bại.");
        }
      })
      .catch(err => {
        console.error("Lỗi khi xóa lịch tiêm:", err);
      });
    }
  }
loadSupportRequests(); 
setInterval(loadSupportRequests, 60000); 