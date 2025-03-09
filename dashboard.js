const DashboardReceitas = () => {
  const [activeGraph, setActiveGraph] = React.useState('geral');
  const [selectedYear, setSelectedYear] = React.useState('todos');

  // Dados das receitas por ano e categoria
  const receitasData = {
    correntes: [
      { year: '2021', valor: 4616789.32 },
      { year: '2022', valor: 5833443.76 },
      { year: '2023', valor: 6642038.68 },
      { year: '2024', valor: 7533664.70 },
      { year: '2025', valor: 8241165.72 }
    ],
    tributarias: [
      { year: '2021', valor: 300416.56 },
      { year: '2022', valor: 501968.22 },
      { year: '2023', valor: 567728.15 },
      { year: '2024', valor: 608358.46 },
      { year: '2025', valor: 812512.25 }
    ],
    transferencias: [
      { year: '2021', valor: 4207374.71 },
      { year: '2022', valor: 5231520.58 },
      { year: '2023', valor: 5894586.94 },
      { year: '2024', valor: 6782890.01 },
      { year: '2025', valor: 7298830.58 }
    ],
    patrimonial: [
      { year: '2021', valor: 5186.67 },
      { year: '2022', valor: 87286.53 },
      { year: '2023', valor: 107776.34 },
      { year: '2024', valor: 117643.88 },
      { year: '2025', valor: 108057.43 }
    ],
    contribuicoes: [
      { year: '2021', valor: 102004.81 },
      { year: '2022', valor: 2670.36 },
      { year: '2023', valor: 67431.80 },
      { year: '2024', valor: 15552.41 },
      { year: '2025', valor: 19739.26 }
    ],
    servicos: [
      { year: '2021', valor: 0 },
      { year: '2022', valor: 6618.63 },
      { year: '2023', valor: 354.66 },
      { year: '2024', valor: 6623.77 },
      { year: '2025', valor: 0 }
    ],
    impostos: {
      iptu: [
        { year: '2021', valor: 1245456.85 },
        { year: '2022', valor: 954838.69 },
        { year: '2023', valor: 1310534.33 },
        { year: '2024', valor: 1776365.70 },
        { year: '2025', valor: 1810671.18 }
      ],
      iss: [
        { year: '2021', valor: 1760369.65 },
        { year: '2022', valor: 1612424.71 },
        { year: '2023', valor: 2389115.39 },
        { year: '2024', valor: 2556878.14 },
        { year: '2025', valor: 3357087.54 }
      ],
      itbi: [
        { year: '2021', valor: 1524948.45 },
        { year: '2022', valor: 612615.21 },
        { year: '2023', valor: 2526661.71 },
        { year: '2024', valor: 2170446.48 },
        { year: '2025', valor: 1994546.28 }
      ],
      irrf: [
        { year: '2021', valor: 1442847.21 },
        { year: '2022', valor: 1220992.39 },
        { year: '2023', valor: 2227139.14 },
        { year: '2024', valor: 3138561.65 },
        { year: '2025', valor: 3815749.08 }
      ]
    },
    rcl: [
      { year: '2021', valor: 59586145.34 },
      { year: '2022', valor: 48375348.03 },
      { year: '2023', valor: 72822880.22 },
      { year: '2024', valor: 85355395.15 },
      { year: '2025', valor: 92299678.74 }
    ]
  };

  // Composição percentual das receitas correntes para 2025
  const composicao2025 = [
    { name: 'Tributárias', value: 9.9 },
    { name: 'Transferências', value: 88.6 },
    { name: 'Patrimoniais', value: 1.3 },
    { name: 'Contribuições', value: 0.2 },
    { name: 'Outras', value: 0.0 }
  ];
  
  // Dados para análise horizontal (crescimento anual)
  const crescimentoAnual = [
    { categoria: 'Receitas Totais', y2022: 26.4, y2023: 13.9, y2024: 13.4, y2025: 9.9 },
    { categoria: 'Tributárias', y2022: 67.1, y2023: 13.1, y2024: 7.2, y2025: 33.6 },
    { categoria: 'Transferências', y2022: 24.3, y2023: 12.7, y2024: 15.1, y2025: 7.6 },
    { categoria: 'Patrimoniais', y2022: 1582.9, y2023: 23.5, y2024: 9.2, y2025: -8.1 },
    { categoria: 'IPTU', y2022: -23.3, y2023: 37.3, y2024: 35.5, y2025: 1.9 },
    { categoria: 'ISS', y2022: -8.4, y2023: 48.2, y2024: 7.0, y2025: 31.3 },
    { categoria: 'ITBI', y2022: -59.8, y2023: 312.4, y2024: -14.1, y2025: -8.1 },
    { categoria: 'IRRF', y2022: -15.4, y2023: 82.4, y2024: 40.9, y2025: 21.6 }
  ];

  // Cores para os gráficos
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Formatador de valores monetários
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(value);
  };

  // Formatador de percentual
  const formatPercent = (value) => {
    return `${value.toFixed(1)}%`;
  };

  // Função para download de dados em CSV
  const downloadCSV = () => {
    // Criar dados CSV a partir dos dados do dashboard
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Ano,Receitas Totais,Receitas Tributárias,Transferências,Patrimonial,Contribuições,Serviços\n";
    
    receitasData.correntes.forEach((item, index) => {
      csvContent += `${item.year},${item.valor},`;
      csvContent += `${receitasData.tributarias[index].valor},`;
      csvContent += `${receitasData.transferencias[index].valor},`;
      csvContent += `${receitasData.patrimonial[index].valor},`;
      csvContent += `${receitasData.contribuicoes[index].valor},`;
      csvContent += `${receitasData.servicos[index].valor}\n`;
    });
    
    // Criar link de download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "receitas_jaguapita_2021-2025.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Renderiza o gráfico de composição das receitas correntes (pizza)
  const renderComposicaoReceitas = () => {
    const { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } = Recharts;

    return (
      <div className="w-full p-4">
        <h3 className="text-lg font-semibold mb-4">Composição das Receitas Correntes - 2025</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={composicao2025}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {composicao2025.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  // Renderiza o gráfico de evolução das receitas totais
  const renderEvolucaoReceitasTotais = () => {
    const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = Recharts;

    return (
      <div className="w-full p-4">
        <h3 className="text-lg font-semibold mb-4">Evolução das Receitas Totais (2021-2025)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={receitasData.correntes}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(value) => formatCurrency(value).replace('R$', '')} />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="valor" 
              name="Receitas Correntes" 
              stroke="#0088FE" 
              activeDot={{ r: 8 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  // Renderiza o gráfico de receitas tributárias
  const renderReceitasTributarias = () => {
    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = Recharts;

    return (
      <div className="w-full p-4">
        <h3 className="text-lg font-semibold mb-4">Evolução das Receitas Tributárias (2021-2025)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={receitasData.tributarias}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(value) => formatCurrency(value).replace('R$', '')} />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
            <Bar dataKey="valor" name="Receitas Tributárias" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  // Renderiza o gráfico de impostos
  const renderImpostos = () => {
    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = Recharts;

    // Preparar dados para o gráfico combinado
    const impostosCombinadosData = receitasData.impostos.iptu.map((item, index) => ({
      year: item.year,
      iptu: item.valor,
      iss: receitasData.impostos.iss[index].valor,
      itbi: receitasData.impostos.itbi[index].valor,
      irrf: receitasData.impostos.irrf[index].valor
    }));

    return (
      <div className="w-full p-4">
        <h3 className="text-lg font-semibold mb-4">Evolução dos Principais Impostos (2021-2025)</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={impostosCombinadosData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(value) => formatCurrency(value).replace('R$', '')} />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
            <Bar dataKey="iptu" name="IPTU" fill="#0088FE" />
            <Bar dataKey="iss" name="ISS" fill="#00C49F" />
            <Bar dataKey="itbi" name="ITBI" fill="#FFBB28" />
            <Bar dataKey="irrf" name="IRRF" fill="#FF8042" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  // Renderiza o gráfico de análise horizontal (crescimento anual)
  const renderCrescimentoAnual = () => {
    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = Recharts;

    return (
      <div className="w-full p-4">
        <h3 className="text-lg font-semibold mb-4">Crescimento Anual por Categoria (%)</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={crescimentoAnual}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tickFormatter={(value) => `${value}%`} />
            <YAxis type="category" dataKey="categoria" width={120} />
            <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
            <Legend />
            <Bar dataKey="y2022" name="2022" fill="#0088FE" />
            <Bar dataKey="y2023" name="2023" fill="#00C49F" />
            <Bar dataKey="y2024" name="2024" fill="#FFBB28" />
            <Bar dataKey="y2025" name="2025" fill="#FF8042" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  // Renderiza o gráfico de receita corrente líquida
  const renderRCL = () => {
    const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = Recharts;

    return (
      <div className="w-full p-4">
        <h3 className="text-lg font-semibold mb-4">Evolução da Receita Corrente Líquida (2021-2025)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={receitasData.rcl}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(value) => (value/1000000).toFixed(1) + 'M'} />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="valor" 
              name="RCL" 
              stroke="#8884d8" 
              activeDot={{ r: 8 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Dashboard Interativo de Receitas Municipais - Jaguapitã</h1>
      
      {/* Navegação */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        <button 
          onClick={() => setActiveGraph('geral')}
          className={`px-4 py-2 rounded ${activeGraph === 'geral' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Visão Geral
        </button>
        <button 
          onClick={() => setActiveGraph('tributarias')}
          className={`px-4 py-2 rounded ${activeGraph === 'tributarias' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Receitas Tributárias
        </button>
        <button 
          onClick={() => setActiveGraph('impostos')}
          className={`px-4 py-2 rounded ${activeGraph === 'impostos' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Impostos
        </button>
        <button 
          onClick={() => setActiveGraph('crescimento')}
          className={`px-4 py-2 rounded ${activeGraph === 'crescimento' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Análise de Crescimento
        </button>
        <button 
          onClick={() => setActiveGraph('rcl')}
          className={`px-4 py-2 rounded ${activeGraph === 'rcl' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          RCL
        </button>
      </div>
      
      {/* Botão de download de dados */}
      <div className="flex justify-center mb-4">
        <button 
          onClick={downloadCSV}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Exportar dados (CSV)
        </button>
      </div>
      
      {/* Conteúdo dinâmico com base na seleção */}
      <div className="mt-4">
        {activeGraph === 'geral' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderEvolucaoReceitasTotais()}
            {renderComposicaoReceitas()}
          </div>
        )}
        
        {activeGraph === 'tributarias' && renderReceitasTributarias()}
        
        {activeGraph === 'impostos' && renderImpostos()}
        
        {activeGraph === 'crescimento' && renderCrescimentoAnual()}
        
        {activeGraph === 'rcl' && renderRCL()}
      </div>
      
      {/* Resumo estatístico */}
      <div className="mt-8 bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Resumo de 2025</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Receitas Totais</p>
            <p className="text-lg font-bold">{formatCurrency(8277807.16)}</p>
            <p className="text-xs text-green-600">+9,9% vs 2024</p>
          </div>
          <div className="bg-green-100 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Receitas Tributárias</p>
            <p className="text-lg font-bold">{formatCurrency(812512.25)}</p>
            <p className="text-xs text-green-600">+33,6% vs 2024</p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-lg">
            <p className="text-sm text-gray-600">RCL</p>
            <p className="text-lg font-bold">{formatCurrency(92299678.74)}</p>
            <p className="text-xs text-green-600">+8,1% vs 2024</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Dependência de Transferências</p>
            <p className="text-lg font-bold">88,6%</p>
            <p className="text-xs text-green-600">-1,4pp vs 2024</p>
          </div>
        </div>
      </div>
      
      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>Fonte: Relatórios contábeis do Município de Jaguapitã (2021-2025)</p>
        <p>Desenvolvido por: Paulo Henrique Figuereido</p>
      </footer>
    </div>
  );
};
