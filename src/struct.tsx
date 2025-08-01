import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import { Paginator } from "primereact/paginator";
import "./App.css";

interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: number;
  date_end: number;
}

const Structure = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [selectedRows, setSelectedRows] = useState<Record<number, Artwork>>({});

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.artic.edu/api/v1/artworks?page=${page + 1}`
      );
      const json = await res.json();
      setArtworks(json.data);
      setTotalRecords(json.pagination.total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const onPageChange = (e: any) => {
    setPage(e.page);
  };

  const isSelected = (row: Artwork) => {
    return !!selectedRows[row.id];
  };

  const toggleRow = (row: Artwork) => {
    setSelectedRows((prev) => {
      const updated = { ...prev };
      if (updated[row.id]) {
        delete updated[row.id];
      } else {
        updated[row.id] = row;
      }
      return updated;
    });
  };

  const toggleAll = (checked: boolean) => {
    setSelectedRows((prev) => {
      const updated = { ...prev };
      artworks.forEach((row) => {
        if (checked) {
          updated[row.id] = row;
        } else {
          delete updated[row.id];
        }
      });
      return updated;
    });
  };

  const header = (
    <div className="table-header">
      <Checkbox
        checked={
          artworks.length > 0 && artworks.every((row) => selectedRows[row.id])
        }
        onChange={(e) => toggleAll(e.checked!)}
      />{" "}
      Select All
    </div>
  );

  return (
    <div className="container">
      <h2>Art Institute of Chicago - Artworks</h2>
      <DataTable
        value={artworks}
        loading={loading}
        header={header}
        paginator={false}
        rowHover
        responsiveLayout="scroll"
      >
        <Column
          header="Select"
          body={(row) => (
            <Checkbox
              checked={isSelected(row)}
              onChange={() => toggleRow(row)}
            />
          )}
          style={{ width: "80px" }}
        />
        <Column field="title" header="Title" />
        <Column field="place_of_origin" header="Place of Origin" />
        <Column field="artist_display" header="Artist" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start Date" />
        <Column field="date_end" header="End Date" />
      </DataTable>
      <Paginator
        first={page * 12}
        rows={12}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
      />

      <div className="selection-panel">
        <h3>Selected Rows:</h3>
        <ul>
          {Object.values(selectedRows).map((row) => (
            <li key={row.id}>{row.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Structure;
