import React, { useContext, useEffect, useMemo, useState } from 'react'
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { darken, lighten, createTheme, ThemeProvider } from '@mui/material';
import { useData } from '@/context/DataContext'

const shades = {
  primary: {
    100: "#FFFFFF",
    200: "#999999",
    300: "#666666",
    400: "#333333",
    500: "#000000",
    600: "#000000",
  },
  secondary: {
    100: "#f7ccd2",
    200: "#ef99a4",
    300: "#e66677",
    400: "#de3349",
    500: "#FFFFFF",
    600: "#ab0016",
    700: "#800011",
    800: "#56000b",
    900: "#2b0006",
  },
  neutral: {
    100: "#f5f5f5",
    200: "#ecebeb",
    300: "#e2e1e1",
    400: "#d9d7d7",
    500: "#cfcdcd",
    600: "#212631",
  },
};

export default function MyTable({ acciones, columns, crud, getInfo = async () => { }, opciones }) {

  const { recarga, setRecarga } = useData()

  const [data, setData] = useState([])
  const [columnFilter, setColumnFilter] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const baseBackgroundColor = 'rgba(0, 0, 0, 0)';

  const tableTheme = useMemo(() => createTheme({
    palette: {
      primary: {
        main: shades.primary[600],
      },
      text: {
        primary: shades.primary[600],
        secondary: shades.primary[600],
      },
      background: {
        default: shades.primary[600],
        paper: shades.primary[100],
      },
    }
  }))

  const table = useMaterialReactTable({
    columns: columns,
    data: opciones.bd ? data : opciones.data,
    manualFiltering: opciones.bd,
    manualPagination: opciones.bd,
    manualSorting: opciones.bd,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilter,
    onSortingChange: setSorting,
    state: opciones.bd ? {
      columnFilter,
      globalFilter,
      isLoading,
      pagination,
      showProgressBars: isRefetching,
      sorting,
    } : {
      pagination,
      columnFilter,
      globalFilter,
    },
    rowCount: opciones.bd ? rowCount : opciones.data.length,
    onPaginationChange: setPagination,
    muiPaginationProps: {
      color: 'primary',
      shape: 'rounded',
      variant: 'outlined',
    },
    paginationDisplayMode: 'pages',
    muiTableBodyProps: {
      sx: (theme) => ({
        '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]) > td':
        {
          backgroundColor: darken(baseBackgroundColor, 0.1),
        },
        '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]):hover > td':
        {
          backgroundColor: darken(baseBackgroundColor, 0.2),
        },
        '& tr:nth-of-type(even):not([data-selected="true"]):not([data-pinned="true"]) > td':
        {
          backgroundColor: lighten(baseBackgroundColor, 0.1),
        },
      }),
    },
    muiTableHeadCellProps: {
      sx: {
        color: 'black',
      }
    },
    muiTableBodyCellProps: {
      sx: {
        color: 'black',
      }
    },
    muiTableHeadProps: {
      sx: {
        "& .MuiSvgIcon-root, .MuiButtonBase-root, .MuiSvgIcon-root, .MuiTableSortLabel-root .MuiTableSortLabel-icon": {
          fontStyle: {
            color: 'black !important',
            opacity: 1
          },
        }
      }
    },
    muiBottomToolbarProps: {
      sx: {
        color: 'black',
        "& .MuiSvgIcon-root, .MuiButtonBase-root, .MuiSvgIcon-root, .MuiTableSortLabel-root": {
          fontStyle: {
            color: 'black !important',
            opacity: 1
          },
        },
        ".css-uqq6zz-MuiFormLabel-root-MuiInputLabel-root": {
          color: 'black !important',
        },
        ".css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input": {
          color: 'black !important',
        }

      }
    },
    muiTopToolbarProps: {
      sx: {
        "& .MuiSvgIcon-root, .MuiButtonBase-root, .MuiSvgIcon-root, .MuiTableSortLabel-root": {
          fontStyle: {
            color: 'black !important',
            opacity: 1
          },
        },
        ".css-12yjm75-MuiInputBase-input-MuiOutlinedInput-input": {
          color: 'black !important',
        },
        ".css-1v8abvc-MuiInputBase-root-MuiOutlinedInput-root": {
          color: 'black !important',
        }
      }
    },
    muiFilterTextFieldProps: {
      sx: {
        color: 'black !important',
        ".css-929hxt-MuiInputBase-input-MuiInput-input": {
          color: 'black !important',
        },
      }
    },
    mrtTheme: (theme) => ({
      baseBackgroundColor: baseBackgroundColor,
    }),
    localization: {
      actions: 'Acciones',
      and: 'y',
      cancel: 'Cancelar',
      changeFilterMode: 'Cambiar modo de filtro',
      changeSearchMode: 'Cambiar modo de búsqueda',
      clearFilter: 'Borrar filtro',
      clearSearch: 'Borrar búsqueda',
      clearSelection: 'Borrar selección',
      clearSort: 'Borrar ordenamiento',
      clickToCopy: 'Haga click para copiar',
      copy: 'Copiar',
      collapse: 'Colapsar',
      collapseAll: 'Colapsar todo',
      columnActions: 'Columna de acciones',
      copiedToClipboard: 'Copiado al portapapeles',
      dropToGroupBy: 'Soltar para agrupar por {column}',
      edit: 'Editar',
      expand: 'Expandir',
      expandAll: 'Expandir todo',
      filterArrIncludes: 'Incluye',
      filterArrIncludesAll: 'Incluye todos',
      filterArrIncludesSome: 'Incluye algunos',
      filterBetween: 'Entre',
      filterBetweenInclusive: 'Entre (inclusivo)',
      filterByColumn: 'Filtrar por {column}',
      filterContains: 'Contiene',
      filterEmpty: 'Vacio',
      filterEndsWith: 'Termina con',
      filterEquals: 'Iguales',
      filterEqualsString: 'Iguales',
      filterFuzzy: 'Difuso',
      filterGreaterThan: 'Mas grande que',
      filterGreaterThanOrEqualTo: 'Mas grande que o igual a',
      filterInNumberRange: 'Entre',
      filterIncludesString: 'Contiene',
      filterIncludesStringSensitive: 'Contiene',
      filterLessThan: 'Menos que',
      filterLessThanOrEqualTo: 'Menos que o igual a',
      filterMode: 'Modo de filtro: {filterType}',
      filterNotEmpty: 'No vacio',
      filterNotEquals: 'No iguales',
      filterStartsWith: 'Empieza con',
      filterWeakEquals: 'Iguales',
      filteringByColumn: 'Filtrando por {column} - {filterType} - {filterValue}',
      goToFirstPage: 'Ir a la primera página',
      goToLastPage: 'Ir a la última página',
      goToNextPage: 'Ir a la página siguiente',
      goToPreviousPage: 'Regresar a la pagina anterior',
      grab: 'Agarrar',
      groupByColumn: 'Agrupar por {column}',
      groupedBy: 'Agrupado por',
      hideAll: 'Ocultar todo',
      hideColumn: 'Ocultar {column}',
      max: 'Máximo',
      min: 'Mínimo',
      move: 'Mover',
      noRecordsToDisplay: 'No hay registros para mostrar',
      noResultsFound: 'No se encontraron resultados',
      of: 'de',
      or: 'o',
      pin: 'Anclar',
      pinToLeft: 'Anclar a la izquierda',
      pinToRight: 'Anclar a la derecha',
      resetColumnSize: 'Resetear tamaño de columna',
      resetOrder: 'Resetar orden',
      rowActions: 'Acciones de fila',
      rowNumber: '#',
      rowNumbers: 'Números de fila',
      rowsPerPage: 'Filas por página',
      save: 'Guardar',
      search: 'Buscar',
      select: 'Seleccionar',
      selectedCountOfRowCountRowsSelected:
        '{selectedCount} de {rowCount} fila(s) seleccionada(s)',
      showAll: 'Mostrar todo',
      showAllColumns: 'Mostrar todas las columnas',
      showHideColumns: 'Mostrar/ocultar columnas',
      showHideFilters: 'Mostrar/ocultar filtros',
      showHideSearch: 'Mostrar/ocultar búsqueda',
      sortByColumnAsc: 'Ordenar por {column} ascendente',
      sortByColumnDesc: 'Ordenar por {column} descendente',
      sortedByColumnAsc: 'Ordenar por {column} ascendente',
      sortedByColumnDesc: 'Ordenar por {column} descendente',
      thenBy: ', despues por ',
      toggleDensity: 'Alternar densidad',
      toggleFullScreen: 'Alternar pantalla completa',
      toggleSelectAll: 'Alternar seleccionar todo',
      toggleSelectRow: 'Alternar seleccionar fila',
      toggleVisibility: 'Alternar visibilidad',
      ungroupByColumn: 'Desagrupar por {column}',
      unpin: 'Desanclar',
      unpinAll: 'Desanclar todo',
    },
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableRowActions: acciones ? true : false,
    enableTopToolbar: crud ? true : false,
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: 'Acciones', //change header text
        size: 150, //make actions column wider
      },
    },
    renderRowActions: ({ row, table }) => (
      <div style={{
        display: 'flex',
        gap: '10px',
      }}>
        {
          acciones.map((accion, index) => {
            return <div key={index}>
              <button                              
                color='light'
                tag='a'
                key={accion.name}
                type='button'
                style={{
                  cursor: (row.original.status == 0 && accion.name == 'eliminar')
                    || (row.original.status == 1 && accion.name == 'activar')
                    ? 'auto'
                    : 'pointer',
                }}
                disabled={((row.original.estado == 'A FACTURAR' || row.original.estado == 'CANCELADA') && accion.name == 'Editar')}
                onClick={(e) => {
                  accion.action(row.original)
                }}>
                {accion.icon}
              </button>
            </div>
          })
        }
      </div>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <div
        style={{
          display: 'flex',
          gap: '10px',
        }}>
        {
          crud?.map((item, index) => {
            return (
              <button
                key={index}
                variant='outline'
                onClick={(e) => { item.action() }}
                color={'dark'}
              >
                {item.name}
              </button>
            )
          })
        }
      </div>

    )

  })

  useEffect(() => {

    const fetchData = async () => {
      if (!data?.length) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }

      if (recarga) {
        setRecarga(false)
      }

      let params = {}

      params['pagina'] = pagination.pageIndex + 1
      params['limite'] = pagination.pageSize
      params['buscar'] = globalFilter
      params['order'] = sorting[0]?.desc ? 'DESC' : 'ASC'
      params['orderBy'] = sorting[0]?.id

      columnFilter.map((filter) => {

        if (Array.isArray(filter.value)) {

          params = {
            ...params,
            'fechaInicio': filter.value[0] != '' && filter.value[0] != undefined ?
              new Date(filter.value[0]).toLocaleDateString('en-GB', { year: "numeric", month: "2-digit", day: "2-digit" }) : '',
            'fechaFin': filter.value[1] != '' && filter.value[1] != undefined ?
              new Date(filter.value[1]).toLocaleDateString('en-GB', { year: "numeric", month: "2-digit", day: "2-digit" }) : '',
          }
        } else {
          params = { ...params, [filter.id]: filter.value }
        }

      })

      try {

        getInfo(params).then((data) => {
          setData(data.data)
          setRowCount(data.total)
        })

      } catch (error) {
        console.error(error);
        return;
      }

      setIsLoading(false);
      setIsRefetching(false);
    };

    if (opciones.bd)
      fetchData()

  }, [
    columnFilter,
    globalFilter,
    pagination.pageIndex,
    pagination.pageSize,
    sorting,
    recarga,
  ])

  return (
    <>

      <ThemeProvider theme={tableTheme}>
        <div
          style={{
            padding: '20px',
          }}
        >
          <MaterialReactTable
            table={
              table
            }
          />
        </div>
      </ThemeProvider>


    </>
  )
}
