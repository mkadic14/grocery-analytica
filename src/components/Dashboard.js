import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import Sidebar from './Sidebar';
import SpendingTrendsChart from './SpendingTrendsChart';
import CategorySpendingChart from './CategorySpendingChart';
import { FaFileExport } from 'react-icons/fa';
import '../Dashboard.css';
import TopProducts from './TopProducts';
import TotalSpending from './TotalSpending';
import TotalPurchases from './TotalPurchases';

const Dashboard = () => {
    const exportPDF = () => {
        const input = document.getElementById('dashboard-content');
    
        html2canvas(input, { 
            scale: 1, 
            useCORS: true,
            onclone: (document) => {
              
            }
        })
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'landscape',
            });
            pdf.addImage(imgData, 'PNG', 0, 0, 210, canvas.height * 210 / canvas.width); 
            pdf.save('dashboard.pdf');
        });
    }
    

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboard-content" id="dashboard-content">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">Grocery Dashboard</h1>
                    <div className="search-and-export">
                        <input type="search" className="search-box" placeholder="Search here" />
                        <button className="export-button" onClick={exportPDF}>
                            <FaFileExport /> {/* Use the imported icon */}
                        </button>
                    </div>
                </div>
                <div className="top-container">
                    <div className="chart-container">
                        <SpendingTrendsChart />
                    </div>
                    <div className="top-products">
                        <TopProducts/>
                    </div>
                </div>
                <div className="bottom-container">
                    <div className="total-spending">
                        <TotalSpending />
                    </div>
                    <div className="total-purchases">
                        <TotalPurchases />
                    </div>
                    <div className="category-spending">
                        <CategorySpendingChart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
