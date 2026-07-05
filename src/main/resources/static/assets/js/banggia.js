    function toggleSubmenu(id) {
        var submenu = document.getElementById(id);
        var icon = document.getElementById('icon-' + id);
        if (submenu.style.display === "none") {
            submenu.style.display = "block";
            icon.classList.remove('fa-caret-right');
            icon.classList.add('fa-caret-down');
        } else {
            submenu.style.display = "none";
            icon.classList.remove('fa-caret-down');
            icon.classList.add('fa-caret-right');
        }
    }

    function toggleMenu() {
        var menu = document.getElementById('menu');
        var icon = document.getElementById('menu-icon');
        if (menu.style.display === "none") {
            menu.style.display = "block";
            icon.classList.remove('fa-caret-right');
            icon.classList.add('fa-caret-down');
        } else {
            menu.style.display = "none";
            icon.classList.remove('fa-caret-down');
            icon.classList.add('fa-caret-right');
        }
    }

    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    let ascending = true; 

function sortTable() {
    const tableBody = document.getElementById("vaccineTableBody");
    const rows = Array.from(tableBody.querySelectorAll("tr"));

    rows.sort((a, b) => {
        const priceA = parseInt(a.cells[4].innerText.replace(/\./g, "")) || 0;
        const priceB = parseInt(b.cells[4].innerText.replace(/\./g, "")) || 0;
        return ascending ? priceA - priceB : priceB - priceA;
    });

   
    tableBody.innerHTML = ""; 
    rows.forEach((row, index) => {
        row.cells[0].innerText = index + 1; 
        tableBody.appendChild(row);
    });

    document.getElementById("sortButton").innerText = ascending ? "Giá cao đến thấp" : "Giá thấp đến cao";
    ascending = !ascending;
}

    
    