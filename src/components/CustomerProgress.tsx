import React, { useState } from 'react';
import { PencilIcon, TrashIcon, PlusIcon, ChevronUpIcon, ChevronDownIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import CopilotLogo from '../assets/Microsoft-Copilot-Logo.png';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Opportunity {
  id: string;
  seats: number;
  description: string;
  notes: string;
  closeDate: string;    // e.g., "Q3 2024"
  confidence: string;   // "Non Commit", "Upside", "Commit with risk", "Committed"
  partner: string;      // Microsoft Partner name
}

interface Stakeholder {
  name: string;
  role: string;
}

interface Customer {
  id: string;
  name: string;
  totalUsers: number;
  adoptedUsers: number;
  opportunities: Opportunity[];
  stakeholders: Stakeholder[];
}

const OPPORTUNITY_COLORS = [
  'bg-[#FFB900]', // Microsoft Yellow
  'bg-[#FFD700]', // Gold
  'bg-[#FFC107]', // Amber
  'bg-[#FFA000]', // Dark Amber
];

type SortField = 'name' | 'opportunityArr';
type SortDirection = 'asc' | 'desc';

interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

type GroupBy = 'none' | 'quarter' | 'partner' | 'quarter-partner';

export default function CustomerProgress() {
  const [customers, setCustomers] = useState([
    {
      id: '1',
      name: 'Datacom',
      totalUsers: 5000,
      adoptedUsers: 3200,
      opportunities: [
        { 
          id: 'OPP-001', 
          seats: 800, 
          description: 'Cloud Services Division',
          notes: 'Initial deployment successful, planning expansion to other divisions',
          closeDate: 'Q4 FY25',
          confidence: 'Committed',
          partner: 'Engage Squared'
        },
        {
          id: 'OPP-002',
          seats: 600,
          description: 'Managed Services Team',
          notes: 'Customer has approved budget for Q4 deployment, training scheduled',
          closeDate: 'Q1 FY26',
          confidence: 'Commit with risk',
          partner: 'Increment'
        },
        {
          id: 'OPP-003',
          seats: 400,
          description: 'Security Operations Center',
          notes: 'Pilot program completed with 95% satisfaction rate',
          closeDate: 'Q2 FY26',
          confidence: 'Upside',
          partner: 'Data #3'
        }
      ],
      stakeholders: [
        { name: 'Sophie Turner', role: 'IT Director' },
        { name: 'James Lee', role: 'Head of Operations' }
      ]
    },
    {
      id: '2',
      name: 'Tourism Holdings Limited',
      totalUsers: 1200,
      adoptedUsers: 450,
      opportunities: [
        { 
          id: 'OPP-002', 
          seats: 300, 
          description: 'Customer Service Team',
          notes: 'Pilot program completed, awaiting budget approval for full rollout',
          closeDate: 'Q4 FY25',
          confidence: 'Commit with risk',
          partner: 'Telstra'
        },
        {
          id: 'OPP-004',
          seats: 200,
          description: 'Rental Operations',
          notes: 'Initial deployment planned for Q4, team training scheduled',
          closeDate: 'Q3 FY26',
          confidence: 'Upside',
          partner: 'Avanade'
        }
      ],
      stakeholders: [
        { name: 'Olivia Chen', role: 'Digital Transformation Lead' }
      ]
    },
    {
      id: '3',
      name: 'NZME',
      totalUsers: 800,
      adoptedUsers: 600,
      opportunities: [
        { 
          id: 'OPP-003', 
          seats: 150, 
          description: 'Digital Media Team',
          notes: 'Deployment in progress, team feedback positive',
          closeDate: 'Q4 FY25',
          confidence: 'Committed',
          partner: 'Microsoft Direct'
        }
      ],
      stakeholders: [
        { name: 'Liam Patel', role: 'CIO' },
        { name: 'Emma Wilson', role: 'Business Analyst' }
      ]
    },
    {
      id: '4',
      name: "Arnott's",
      totalUsers: 2500,
      adoptedUsers: 1800,
      opportunities: [
        { 
          id: 'OPP-004', 
          seats: 400, 
          description: 'Manufacturing Operations',
          notes: 'Testing phase complete, ready for production deployment',
          closeDate: 'Q1 FY26',
          confidence: 'Commit with risk',
          partner: 'Generation-e'
        }
      ],
      stakeholders: [
        { name: 'Lucas Brown', role: 'IT Manager' }
      ]
    },
    {
      id: '5',
      name: 'TNA Solutions',
      totalUsers: 600,
      adoptedUsers: 400,
      opportunities: [
        { 
          id: 'OPP-005', 
          seats: 150, 
          description: 'Engineering Team',
          notes: 'Initial deployment successful, planning phase 2',
          closeDate: 'Q2 FY26',
          confidence: 'Upside',
          partner: 'Engage Squared'
        }
      ],
      stakeholders: [
        { name: 'Mia Robinson', role: 'Head of Engineering' },
        { name: 'Noah Smith', role: 'Project Manager' }
      ]
    },
    {
      id: '6',
      name: 'Forestry Corp of NSW',
      totalUsers: 1500,
      adoptedUsers: 900,
      opportunities: [
        { 
          id: 'OPP-006', 
          seats: 300, 
          description: 'Field Operations',
          notes: 'Pilot program in progress, early results promising',
          closeDate: 'Q4 FY25',
          confidence: 'Commit with risk',
          partner: 'Increment'
        }
      ],
      stakeholders: [
        { name: 'Ava Martin', role: 'Operations Lead' }
      ]
    },
    {
      id: '7',
      name: 'Waste Management',
      totalUsers: 3000,
      adoptedUsers: 2200,
      opportunities: [
        { 
          id: 'OPP-007', 
          seats: 500, 
          description: 'Operations Team',
          notes: 'Deployment scheduled for Q3',
          closeDate: 'Q3 FY26',
          confidence: 'Upside',
          partner: 'Data #3'
        }
      ],
      stakeholders: [
        { name: 'Ethan Clark', role: 'Sustainability Officer' },
        { name: 'Grace Evans', role: 'IT Business Partner' }
      ]
    },
    {
      id: '8',
      name: '2Degrees',
      totalUsers: 2000,
      adoptedUsers: 1500,
      opportunities: [
        { 
          id: 'OPP-008', 
          seats: 300, 
          description: 'Customer Support',
          notes: 'Initial feedback positive, planning expansion',
          closeDate: 'Q1 FY26',
          confidence: 'Upside',
          partner: 'Telstra'
        }
      ],
      stakeholders: [
        { name: 'Benjamin Scott', role: 'Head of Customer Service' }
      ]
    },
    {
      id: '9',
      name: 'Contact Energy',
      totalUsers: 1800,
      adoptedUsers: 1200,
      opportunities: [
        { 
          id: 'OPP-009', 
          seats: 400, 
          description: 'Energy Trading',
          notes: 'Deployment in progress, team training scheduled',
          closeDate: 'Q2 FY26',
          confidence: 'Commit with risk',
          partner: 'Avanade'
        }
      ]
    },
    {
      id: '10',
      name: 'Sky TV',
      totalUsers: 1000,
      adoptedUsers: 700,
      opportunities: [
        { 
          id: 'OPP-010', 
          seats: 200, 
          description: 'Content Production',
          notes: 'Pilot program completed, awaiting final approval',
          closeDate: 'Q3 FY26',
          confidence: 'Upside',
          partner: 'Microsoft Direct'
        }
      ]
    },
    {
      id: '11',
      name: 'Inghams',
      totalUsers: 4000,
      adoptedUsers: 2800,
      opportunities: [
        { 
          id: 'OPP-011', 
          seats: 800, 
          description: 'Processing Plants',
          notes: 'Initial deployment successful, planning next phase',
          closeDate: 'Q1 FY26',
          confidence: 'Committed',
          partner: 'Generation-e'
        },
        {
          id: 'OPP-012',
          seats: 500,
          description: 'Supply Chain Operations',
          notes: 'Deployment scheduled for Q3, team training in progress',
          closeDate: 'Q2 FY26',
          confidence: 'Commit with risk',
          partner: 'Engage Squared'
        },
        {
          id: 'OPP-013',
          seats: 300,
          description: 'Quality Assurance',
          notes: 'Pilot program completed, awaiting final approval',
          closeDate: 'Q3 FY26',
          confidence: 'Upside',
          partner: 'Increment'
        }
      ]
    },
    {
      id: '12',
      name: 'Teys',
      totalUsers: 3500,
      adoptedUsers: 2500,
      opportunities: [
        { 
          id: 'OPP-012', 
          seats: 600, 
          description: 'Processing Operations',
          notes: 'Deployment in progress, team feedback positive',
          closeDate: 'Q1 FY26',
          confidence: 'Committed',
          partner: 'Data #3'
        },
        {
          id: 'OPP-014',
          seats: 400,
          description: 'Logistics Team',
          notes: 'Initial deployment successful, planning expansion',
          closeDate: 'Q2 FY26',
          confidence: 'Non Commit',
          partner: 'Telstra'
        }
      ]
    },
    {
      id: '13',
      name: 'BORG Manufacturing',
      totalUsers: 800,
      adoptedUsers: 500,
      opportunities: [
        { 
          id: 'OPP-013', 
          seats: 200, 
          description: 'Engineering Team',
          notes: 'Pilot program in progress, early results promising',
          closeDate: 'Q3 FY26',
          confidence: 'Upside',
          partner: 'Avanade'
        }
      ]
    },
    {
      id: '14',
      name: 'MAAS Group',
      totalUsers: 1200,
      adoptedUsers: 800,
      opportunities: [
        { 
          id: 'OPP-014', 
          seats: 250, 
          description: 'Construction Teams',
          notes: 'Initial deployment successful, planning expansion',
          closeDate: 'Q1 FY26',
          confidence: 'Upside',
          partner: 'Microsoft Direct'
        }
      ]
    },
    {
      id: '15',
      name: 'HW Richardson',
      totalUsers: 2500,
      adoptedUsers: 1800,
      opportunities: [
        { 
          id: 'OPP-015', 
          seats: 400, 
          description: 'Transport Operations',
          notes: 'Deployment scheduled for Q3',
          closeDate: 'Q2 FY26',
          confidence: 'Committed',
          partner: 'Generation-e'
        },
        {
          id: 'OPP-016',
          seats: 300,
          description: 'Fleet Management',
          notes: 'Pilot program completed, awaiting budget approval',
          closeDate: 'Q3 FY26',
          confidence: 'Commit with risk',
          partner: 'Engage Squared'
        },
        {
          id: 'OPP-017',
          seats: 200,
          description: 'Maintenance Teams',
          notes: 'Initial deployment successful, planning next phase',
          closeDate: 'Q4 FY26',
          confidence: 'Upside',
          partner: 'Increment'
        }
      ]
    },
    {
      id: '16',
      name: 'Unison',
      totalUsers: 900,
      adoptedUsers: 600,
      opportunities: [
        { 
          id: 'OPP-016', 
          seats: 200, 
          description: 'Network Operations',
          notes: 'Pilot program completed, awaiting final approval',
          closeDate: 'Q4 FY26',
          confidence: 'Upside',
          partner: 'Data #3'
        }
      ]
    },
    {
      id: '17',
      name: 'Clarus',
      totalUsers: 700,
      adoptedUsers: 450,
      opportunities: [
        { 
          id: 'OPP-017', 
          seats: 150, 
          description: 'Software Development',
          notes: 'Initial deployment successful, planning next phase',
          closeDate: 'Q4 FY26',
          confidence: 'Upside',
          partner: 'Telstra'
        }
      ]
    }
  ] as Customer[]);

  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [editingOpportunity, setEditingOpportunity] = useState<{ customerId: string; opportunity: Opportunity | null }>({ customerId: '', opportunity: null });

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'name',
    direction: 'asc'
  });

  const [groupBy, setGroupBy] = useState<GroupBy>('quarter');
  const [selectedPartner, setSelectedPartner] = useState<string>('all');
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const calculateAnnualRevenue = (adoptedUsers: number) => {
    return adoptedUsers * 30 * 12;
  };

  const calculateOpportunityRevenue = (opportunities: Opportunity[]) => {
    return opportunities.reduce((sum, opp) => sum + (opp.seats * 30 * 12), 0);
  };

  const calculatePotentialRevenue = (totalUsers: number, adoptedUsers: number, opportunities: Opportunity[]) => {
    const opportunitySeats = opportunities.reduce((sum, opp) => sum + opp.seats, 0);
    return (totalUsers - adoptedUsers - opportunitySeats) * 30 * 12;
  };

  const addCustomer = () => {
    const newCustomer: Customer = {
      id: Date.now().toString(),
      name: 'New Customer',
      totalUsers: 0,
      adoptedUsers: 0,
      opportunities: [],
      stakeholders: []
    };
    setCustomers([...customers, newCustomer]);
    setEditingCustomer(newCustomer);
  };

  const deleteCustomer = (id: string) => {
    setCustomers(customers.filter(customer => customer.id !== id));
  };

  const updateCustomer = (updatedCustomer: Customer) => {
    setCustomers(customers.map(customer => 
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    ));
    setEditingCustomer(null);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
  };

  const addOpportunity = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    if (!customer || customer.opportunities.length >= 4) return;

    const newOpportunity: Opportunity = {
      id: `OPP-${Date.now().toString().slice(-4)}`,
      seats: 0,
      description: 'New Opportunity',
      notes: '',
      closeDate: '',
      confidence: 'Medium',
      partner: 'Microsoft'
    };
    setEditingOpportunity({ customerId, opportunity: newOpportunity });
  };

  const updateOpportunity = (customerId: string, updatedOpportunity: Opportunity) => {
    setCustomers(customers.map(customer => {
      if (customer.id === customerId) {
        const opportunities = customer.opportunities.map(opp => 
          opp.id === updatedOpportunity.id ? updatedOpportunity : opp
        );
        if (!opportunities.find(opp => opp.id === updatedOpportunity.id)) {
          opportunities.push(updatedOpportunity);
        }
        return { ...customer, opportunities };
      }
      return customer;
    }));
    setEditingOpportunity({ customerId: '', opportunity: null });
  };

  const deleteOpportunity = (customerId: string, opportunityId: string) => {
    setCustomers(customers.map(customer => {
      if (customer.id === customerId) {
        return {
          ...customer,
          opportunities: customer.opportunities.filter(opp => opp.id !== opportunityId)
        };
      }
      return customer;
    }));
  };

  const getSortedCustomers = () => {
    return [...customers].sort((a, b) => {
      if (sortConfig.field === 'name') {
        return sortConfig.direction === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        const aArr = calculateOpportunityRevenue(a.opportunities);
        const bArr = calculateOpportunityRevenue(b.opportunities);
        return sortConfig.direction === 'asc'
          ? aArr - bArr
          : bArr - aArr;
      }
    });
  };

  const handleSort = (field: SortField) => {
    setSortConfig(current => ({
      field,
      direction: current.field === field && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getUniquePartners = () => {
    const partners = new Set<string>();
    customers.forEach(customer => {
      customer.opportunities.forEach(opp => {
        partners.add(opp.partner);
      });
    });
    return Array.from(partners).sort();
  };

  const getGroupedCustomers = () => {
    let filteredCustomers = customers;
    
    // Apply partner filter if one is selected
    if (selectedPartner !== 'all') {
      filteredCustomers = customers.filter(customer => 
        customer.opportunities.some(opp => opp.partner === selectedPartner)
      );
    }

    // Apply sorting to filtered customers
    filteredCustomers = filteredCustomers.sort((a, b) => {
      if (sortConfig.field === 'name') {
        return sortConfig.direction === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        const aArr = calculateOpportunityRevenue(a.opportunities);
        const bArr = calculateOpportunityRevenue(b.opportunities);
        return sortConfig.direction === 'asc'
          ? aArr - bArr
          : bArr - aArr;
      }
    });

    if (groupBy === 'none') {
      return filteredCustomers;
    }

    if (groupBy === 'partner') {
      const grouped = filteredCustomers.reduce((acc, customer) => {
        // Only include opportunities from the selected partner
        const relevantOpps = selectedPartner === 'all' 
          ? customer.opportunities 
          : customer.opportunities.filter(opp => opp.partner === selectedPartner);

        relevantOpps.forEach(opp => {
          if (!acc[opp.partner]) {
            acc[opp.partner] = [];
          }
          if (!acc[opp.partner].includes(customer)) {
            acc[opp.partner].push(customer);
          }
        });

        if (relevantOpps.length === 0) {
          if (!acc['No Partner']) {
            acc['No Partner'] = [];
          }
          acc['No Partner'].push(customer);
        }

        return acc;
      }, {} as Record<string, Customer[]>);

      return grouped;
    }

    if (groupBy === 'quarter-partner') {
      const grouped = filteredCustomers.reduce((acc, customer) => {
        // Only include opportunities from the selected partner
        const relevantOpps = selectedPartner === 'all' 
          ? customer.opportunities 
          : customer.opportunities.filter(opp => opp.partner === selectedPartner);

        const quarters = new Set(
          relevantOpps.map(opp => opp.closeDate)
        );
        
        quarters.forEach(quarter => {
          if (!acc[quarter]) {
            acc[quarter] = [];
          }
          acc[quarter].push(customer);
        });

        if (relevantOpps.length === 0) {
          if (!acc['No Close Date']) {
            acc['No Close Date'] = [];
          }
          acc['No Close Date'].push(customer);
        }

        return acc;
      }, {} as Record<string, Customer[]>);

      return grouped;
    }

    // Quarter grouping logic
    const grouped = filteredCustomers.reduce((acc, customer) => {
      // Only include opportunities from the selected partner
      const relevantOpps = selectedPartner === 'all' 
        ? customer.opportunities 
        : customer.opportunities.filter(opp => opp.partner === selectedPartner);

      const quarters = new Set(
        relevantOpps.map(opp => opp.closeDate)
      );
      
      quarters.forEach(quarter => {
        if (!acc[quarter]) {
          acc[quarter] = [];
        }
        acc[quarter].push(customer);
      });

      if (relevantOpps.length === 0) {
        if (!acc['No Close Date']) {
          acc['No Close Date'] = [];
        }
        acc['No Close Date'].push(customer);
      }

      return acc;
    }, {} as Record<string, Customer[]>);

    return Object.entries(grouped)
      .sort(([a], [b]) => {
        if (a === 'No Close Date') return 1;
        if (b === 'No Close Date') return -1;
        
        const [aQuarter, aYear] = a.split(' ');
        const [bQuarter, bYear] = b.split(' ');
        
        if (aYear !== bYear) {
          return aYear.localeCompare(bYear);
        }
        
        return aQuarter.localeCompare(bQuarter);
      })
      .reduce((acc, [quarter, customers]) => {
        acc[quarter] = customers;
        return acc;
      }, {} as Record<string, Customer[]>);
  };

  const calculateQuarterARR = (customers: Customer[], quarter: string) => {
    return customers.reduce((total, customer) => {
      const quarterOpps = customer.opportunities.filter(opp => opp.closeDate === quarter);
      const quarterARR = quarterOpps.reduce((sum, opp) => sum + (opp.seats * 30 * 12), 0);
      return total + quarterARR;
    }, 0);
  };

  const calculateQuarterPartnerARR = (customers: Customer[], quarter: string, partner: string) => {
    return customers.reduce((total, customer) => {
      const partnerOpps = customer.opportunities.filter(opp => 
        opp.closeDate === quarter && opp.partner === partner
      );
      return total + calculateOpportunityRevenue(partnerOpps);
    }, 0);
  };

  const getQuarterPartnerOpportunities = (customers: Customer[], quarter: string, partner: string) => {
    const opportunities: Opportunity[] = [];
    customers.forEach(customer => {
      const partnerOpps = customer.opportunities.filter(opp => 
        opp.closeDate === quarter && opp.partner === partner
      );
      opportunities.push(...partnerOpps);
    });
    return opportunities;
  };

  const getCurrentQuarterData = () => {
    const currentQuarter = 'Q4 FY25'; // This could be made dynamic based on current date
    const currentQuarterOpps = customers.flatMap(customer => 
      customer.opportunities.filter(opp => opp.closeDate === currentQuarter)
    );

    const totalARR = currentQuarterOpps.reduce((sum, opp) => sum + (opp.seats * 30 * 12), 0);
    const totalSeats = currentQuarterOpps.reduce((sum, opp) => sum + opp.seats, 0);

    // Get top 5 deals by ARR
    const topDeals = [...currentQuarterOpps]
      .sort((a, b) => (b.seats * 30 * 12) - (a.seats * 30 * 12))
      .slice(0, 5);

    // Get partner distribution
    const partnerData = currentQuarterOpps.reduce((acc, opp) => {
      acc[opp.partner] = (acc[opp.partner] || 0) + (opp.seats * 30 * 12);
      return acc;
    }, {} as Record<string, number>);

    return {
      totalARR,
      totalSeats,
      topDeals,
      partnerData
    };
  };

  const currentQuarterData = getCurrentQuarterData();

  const partnerChartData = {
    labels: Object.keys(currentQuarterData.partnerData),
    datasets: [
      {
        data: Object.values(currentQuarterData.partnerData),
        backgroundColor: [
          '#FFB900', // Microsoft Yellow
          '#0078D4', // Microsoft Blue
          '#7FBA00', // Microsoft Green
          '#F25022', // Microsoft Red
          '#00BCF2', // Microsoft Light Blue
          '#FF8C00', // Dark Orange
          '#A4262C', // Dark Red
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-8 transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center space-x-2">
              <img src={CopilotLogo} alt="Microsoft 365 Copilot" className="h-10 sm:h-12 md:h-16 lg:h-20 w-auto max-w-xs object-contain" />
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-[#0078D4]'}`}>MyFrontiers</h1>
            </div>
            <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Track Copilot adoption and revenue potential across your customer base
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              {isDarkMode ? (
                <SunIcon className="h-6 w-6 text-yellow-400" />
              ) : (
                <MoonIcon className="h-6 w-6 text-gray-600" />
              )}
            </button>
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Group by:</span>
              <select
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value as GroupBy)}
                className={`rounded-md text-sm focus:ring-[#0078D4] ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-gray-200' 
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
              >
                <option value="none">No Grouping</option>
                <option value="quarter">Close Quarter</option>
                <option value="quarter-partner">Quarter with Partners</option>
                <option value="partner">Partner</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Filter by Partner:</span>
              <select
                value={selectedPartner}
                onChange={(e) => setSelectedPartner(e.target.value)}
                className={`rounded-md text-sm focus:ring-[#0078D4] ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-gray-200' 
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
              >
                <option value="all">All Partners</option>
                {getUniquePartners().map(partner => (
                  <option key={partner} value={partner}>{partner}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sort by:</span>
              <select
                value={`${sortConfig.field}-${sortConfig.direction}`}
                onChange={(e) => {
                  const [field, direction] = e.target.value.split('-') as [SortField, SortDirection];
                  setSortConfig({ field, direction });
                }}
                className={`rounded-md text-sm focus:ring-[#0078D4] ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-gray-200' 
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="opportunityArr-asc">Opportunity ARR (Low to High)</option>
                <option value="opportunityArr-desc">Opportunity ARR (High to Low)</option>
              </select>
            </div>
            {/* <button
              onClick={addCustomer}
              className="px-4 py-2 bg-[#0078D4] text-white rounded-lg hover:bg-[#106EBE] transition-colors"
            >
              Add Customer
            </button> */}
          </div>
        </div>

        {/* Executive Summary Section */}
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mb-8 transition-colors duration-200`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#0078D4]'}`}>Executive Summary</h2>
            <button
              onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
              className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              {isSummaryExpanded ? (
                <ChevronUpIcon className={`h-6 w-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              ) : (
                <ChevronDownIcon className={`h-6 w-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              )}
            </button>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-300 ${isSummaryExpanded ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
            <div className="space-y-6">
              <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg transition-colors duration-200`}>
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>Current Quarter (Q4 FY25)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Opportunity ARR</p>
                    <p className="text-2xl font-bold text-[#0078D4]">
                      ${currentQuarterData.totalARR.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Targeted Copilot Seats</p>
                    <p className="text-2xl font-bold text-[#7FBA00]">
                      {currentQuarterData.totalSeats.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg transition-colors duration-200`}>
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>Top 5 Deals</h3>
                <div className="space-y-2">
                  {currentQuarterData.topDeals.map((deal) => (
                    <div key={deal.id} className="flex justify-between items-center">
                      <div>
                        <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{deal.description}</p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{deal.partner}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#FFB900]">
                          ${(deal.seats * 30 * 12).toLocaleString()}
                        </p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{deal.seats} seats</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg transition-colors duration-200`}>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-4`}>Partner Distribution</h3>
              <div className="h-64">
                <Pie 
                  data={partnerChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                        labels: {
                          color: isDarkMode ? '#E5E7EB' : '#374151'
                        }
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            const value = context.raw as number;
                            return `${context.label}: $${value.toLocaleString()}`;
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 transition-colors duration-200`}>
          {groupBy === 'none' ? (
            (getGroupedCustomers() as Customer[]).map((customer) => {
              const progress = (customer.adoptedUsers / customer.totalUsers) * 100;
              const annualRevenue = calculateAnnualRevenue(customer.adoptedUsers);
              const opportunityRevenue = calculateOpportunityRevenue(
                selectedPartner === 'all' 
                  ? customer.opportunities 
                  : customer.opportunities.filter(opp => opp.partner === selectedPartner)
              );
              const potentialRevenue = calculatePotentialRevenue(
                customer.totalUsers, 
                customer.adoptedUsers, 
                selectedPartner === 'all' 
                  ? customer.opportunities 
                  : customer.opportunities.filter(opp => opp.partner === selectedPartner)
              );
              
              return (
                <div key={customer.id} className="mb-10 last:mb-0 pb-8 border-b border-gray-200 last:border-b-0">
                  {editingCustomer?.id === customer.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Name</label>
                          <input
                            type="text"
                            value={editingCustomer.name}
                            onChange={(e) => setEditingCustomer({...editingCustomer, name: e.target.value})}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Total Users (Target)</label>
                          <input
                            type="number"
                            value={editingCustomer.totalUsers}
                            onChange={(e) => setEditingCustomer({...editingCustomer, totalUsers: Number(e.target.value)})}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Adopted Users (Current)</label>
                          <input
                            type="number"
                            value={editingCustomer.adoptedUsers}
                            onChange={(e) => setEditingCustomer({...editingCustomer, adoptedUsers: Number(e.target.value)})}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setEditingCustomer(null)}
                          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => updateCustomer(editingCustomer)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-[#0078D4]">{customer.name}</h3>
                          {customer.stakeholders && customer.stakeholders.length > 0 && (
                            <span className={isDarkMode ? "text-white" : "text-gray-500"}>
                              {customer.stakeholders.map((s, i) => (
                                <span key={i} className="ml-1 first:ml-0">
                                  {s.name} ({s.role}){i !== customer.stakeholders.length - 1 && <span>,</span>}
                                </span>
                              ))}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-sm text-gray-600">
                              ${annualRevenue.toLocaleString()} current ARR
                            </div>
                            {opportunityRevenue > 0 && (
                              <div className="text-sm text-[#FFB900]">
                                +${opportunityRevenue.toLocaleString()} opportunity ARR
                              </div>
                            )}
                            <div className="text-sm text-[#7FBA00]">
                              +${potentialRevenue.toLocaleString()} potential ARR
                            </div>
                          </div>
                          {/* <button
                            onClick={() => handleEdit(customer)}
                            className="text-gray-400 hover:text-[#0078D4]"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => deleteCustomer(customer.id)}
                            className="text-gray-400 hover:text-[#F25022]"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button> */}
                        </div>
                      </div>
                      <div className="relative h-8 bg-gray-200 rounded-full overflow-visible flex">
                        {/* Adopted Users (Microsoft Green) */}
                        <div
                          className="h-full bg-gradient-to-r from-[#7FBA00] to-[#5E9C00] transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                        {/* Opportunities (Microsoft Yellow) */}
                        {customer.opportunities.map((opportunity, index) => {
                          const opportunityProgress = (opportunity.seats / customer.totalUsers) * 100;
                          const opportunityRevenue = opportunity.seats * 30 * 12;
                          const confidenceColor = {
                            'Committed': 'text-green-600',
                            'Commit with risk': 'text-yellow-600',
                            'Upside': 'text-blue-600',
                            'Non Commit': 'text-red-600'
                          }[opportunity.confidence];
                          
                          return (
                            <div
                              key={opportunity.id}
                              className={`h-full ${OPPORTUNITY_COLORS[index]} transition-all duration-500 relative group cursor-pointer`}
                              style={{ width: `${opportunityProgress}%` }}
                            >
                              <div className="hidden group-hover:block absolute z-50 left-1/2 -translate-x-1/2 -top-2 transform -translate-y-full bg-white text-gray-900 text-xs rounded shadow-lg p-2 min-w-[200px]">
                                <div className="font-semibold mb-1 text-[#FFB900]">{opportunity.id}</div>
                                <div className={isDarkMode ? "text-white" : "text-gray-600"}>{opportunity.description}</div>
                                <div className="mt-1">
                                  <span className={isDarkMode ? "text-[#ffe066] font-medium" : "text-[#FFB900] font-medium"}>
                                    ${opportunityRevenue.toLocaleString()}
                                  </span>
                                  <span className="text-gray-500"> annual revenue</span>
                                </div>
                                <div className="text-gray-500 mb-2">{opportunity.seats} Copilot seats</div>
                                <div className={isDarkMode ? "text-white ml-2" : "text-gray-500 ml-2"}>{opportunity.closeDate}</div>
                                <div className="text-gray-500">Partner: {opportunity.partner}</div>
                                <div className={`text-${confidenceColor} font-medium`}>Confidence: {opportunity.confidence}</div>
                                {opportunity.notes && (
                                  <div className="mt-2 pt-2 border-t border-gray-200">
                                    <div className="text-gray-500 text-xs italic">Latest Notes:</div>
                                    <div className="text-gray-600 text-xs mt-1">{opportunity.notes}</div>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          {progress.toFixed(1)}% ({customer.adoptedUsers}/{customer.totalUsers} Copilot seats)
                        </div>
                        {/* {customer.opportunities.length < 4 && (
                          <button
                            onClick={() => addOpportunity(customer.id)}
                            className="text-sm text-[#0078D4] hover:text-[#106EBE] flex items-center"
                          >
                            <PlusIcon className="h-4 w-4 mr-1" />
                            Add Opportunity
                          </button>
                        )} */}
                      </div>
                      {editingOpportunity.customerId === customer.id && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Opportunity ID</label>
                              <input
                                type="text"
                                value={editingOpportunity.opportunity?.id}
                                onChange={(e) => setEditingOpportunity({
                                  ...editingOpportunity,
                                  opportunity: { ...editingOpportunity.opportunity!, id: e.target.value }
                                })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Description</label>
                              <input
                                type="text"
                                value={editingOpportunity.opportunity?.description}
                                onChange={(e) => setEditingOpportunity({
                                  ...editingOpportunity,
                                  opportunity: { ...editingOpportunity.opportunity!, description: e.target.value }
                                })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Seats</label>
                              <input
                                type="number"
                                value={editingOpportunity.opportunity?.seats}
                                onChange={(e) => setEditingOpportunity({
                                  ...editingOpportunity,
                                  opportunity: { ...editingOpportunity.opportunity!, seats: Number(e.target.value) }
                                })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="block text-sm font-medium text-gray-700">Latest Notes</label>
                              <textarea
                                value={editingOpportunity.opportunity?.notes}
                                onChange={(e) => setEditingOpportunity({
                                  ...editingOpportunity,
                                  opportunity: { ...editingOpportunity.opportunity!, notes: e.target.value }
                                })}
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Add notes about this opportunity..."
                              />
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end space-x-2">
                            <button
                              onClick={() => setEditingOpportunity({ customerId: '', opportunity: null })}
                              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => updateOpportunity(customer.id, editingOpportunity.opportunity!)}
                              className="px-4 py-2 bg-[#0078D4] text-white rounded-lg hover:bg-[#106EBE] transition-colors"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      )}
                      {customer.opportunities.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {customer.opportunities.map((opportunity, index) => {
                            const dealSize = opportunity.seats * 30 * 12;
                            const confidenceColor = {
                              'Committed': 'text-green-600',
                              'Commit with risk': 'text-yellow-600',
                              'Upside': 'text-blue-600',
                              'Non Commit': 'text-red-600'
                            }[opportunity.confidence];
                            
                            return (
                              <div key={opportunity.id} className="flex justify-between items-center text-sm">
                                <div className="flex items-center">
                                  <div className={`w-3 h-3 rounded-full ${OPPORTUNITY_COLORS[index]} mr-2`} />
                                  <span className={isDarkMode ? "text-white" : "text-gray-600"}>
                                    {opportunity.id} - {opportunity.description} ({opportunity.seats} seats)
                                  </span>
                                  <span className="ml-2 text-[#FFB900] font-medium">
                                    ${dealSize.toLocaleString()} ARR
                                  </span>
                                  <span className={isDarkMode ? "text-white ml-2" : "text-gray-500 ml-2"}>
                                    | {opportunity.closeDate}
                                  </span>
                                  <span className={`ml-2 ${confidenceColor} font-medium`}>
                                    | {opportunity.confidence}
                                  </span>
                                </div>
                                {/* <button
                                  onClick={() => deleteOpportunity(customer.id, opportunity.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <TrashIcon className="h-4 w-4" />
                                </button> */}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })
          ) : groupBy === 'partner' ? (
            Object.entries(getGroupedCustomers()).map(([partner, customers]) => {
              const partnerARR = customers.reduce((total: number, customer: Customer) => {
                const partnerOpps = customer.opportunities.filter((opp: Opportunity) => opp.partner === partner);
                return total + calculateOpportunityRevenue(partnerOpps);
              }, 0);

              return (
                <div key={partner} className="mb-8 last:mb-0">
                  <div className="flex items-center mb-4">
                    <h2 className={isDarkMode ? "text-3xl font-semibold text-white" : "text-3xl font-semibold text-red-600"}>
                      {partner}
                    </h2>
                    <span className="ml-4 text-xl font-medium text-red-600">
                      ${partnerARR.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      ({customers.length} customers)
                    </span>
                  </div>
                  {customers.map((customer: Customer) => {
                    const progress = (customer.adoptedUsers / customer.totalUsers) * 100;
                    const annualRevenue = calculateAnnualRevenue(customer.adoptedUsers);
                    const opportunityRevenue = calculateOpportunityRevenue(customer.opportunities);
                    const potentialRevenue = calculatePotentialRevenue(customer.totalUsers, customer.adoptedUsers, customer.opportunities);
                    
                    return (
                      <div key={customer.id} className="mb-10 last:mb-0 pb-8 border-b border-gray-200 last:border-b-0">
                        {editingCustomer?.id === customer.id ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                  type="text"
                                  value={editingCustomer.name}
                                  onChange={(e) => setEditingCustomer({
                                    ...editingCustomer,
                                    name: e.target.value
                                  })}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Total Users (Target)</label>
                                <input
                                  type="number"
                                  value={editingCustomer.totalUsers}
                                  onChange={(e) => setEditingCustomer({
                                    ...editingCustomer,
                                    totalUsers: Number(e.target.value)
                                  })}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Adopted Users (Current)</label>
                                <input
                                  type="number"
                                  value={editingCustomer.adoptedUsers}
                                  onChange={(e) => setEditingCustomer({
                                    ...editingCustomer,
                                    adoptedUsers: Number(e.target.value)
                                  })}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                            </div>
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => setEditingCustomer(null)}
                                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => editingCustomer && updateCustomer(editingCustomer)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center space-x-2">
                                  <h3 className="text-lg font-semibold text-[#0078D4]">{customer.name}</h3>
                                  {customer.stakeholders && customer.stakeholders.length > 0 && (
                                    <span className={isDarkMode ? "text-white" : "text-gray-500"}>
                                      {customer.stakeholders.map((s, i) => (
                                        <span key={i} className="ml-1 first:ml-0">
                                          {s.name} ({s.role}){i !== customer.stakeholders.length - 1 && <span>,</span>}
                                        </span>
                                      ))}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="text-right">
                                  <div className="text-sm text-gray-600">
                                    ${annualRevenue.toLocaleString()} current ARR
                                  </div>
                                  {opportunityRevenue > 0 && (
                                    <div className="text-sm text-[#FFB900]">
                                      +${opportunityRevenue.toLocaleString()} opportunity ARR
                                    </div>
                                  )}
                                  <div className="text-sm text-[#7FBA00]">
                                    +${potentialRevenue.toLocaleString()} potential ARR
                                  </div>
                                </div>
                                {/* <button
                                  onClick={() => handleEdit(customer)}
                                  className="text-gray-400 hover:text-[#0078D4]"
                                >
                                  <PencilIcon className="h-5 w-5" />
                                </button>
                                <button
                                  onClick={() => deleteCustomer(customer.id)}
                                  className="text-gray-400 hover:text-[#F25022]"
                                >
                                  <TrashIcon className="h-5 w-5" />
                                </button> */}
                              </div>
                            </div>
                            <div className="relative h-8 bg-gray-200 rounded-full overflow-visible flex">
                              {/* Adopted Users (Microsoft Green) */}
                              <div
                                className="h-full bg-gradient-to-r from-[#7FBA00] to-[#5E9C00] transition-all duration-500"
                                style={{ width: `${progress}%` }}
                              />
                              {/* Opportunities (Microsoft Yellow) */}
                              {customer.opportunities.map((opportunity, index) => {
                                const opportunityProgress = (opportunity.seats / customer.totalUsers) * 100;
                                const opportunityRevenue = opportunity.seats * 30 * 12;
                                const confidenceColor = {
                                  'Committed': 'text-green-600',
                                  'Commit with risk': 'text-yellow-600',
                                  'Upside': 'text-blue-600',
                                  'Non Commit': 'text-red-600'
                                }[opportunity.confidence];
                                
                                return (
                                  <div
                                    key={opportunity.id}
                                    className={`h-full ${OPPORTUNITY_COLORS[index]} transition-all duration-500 relative group cursor-pointer`}
                                    style={{ width: `${opportunityProgress}%` }}
                                  >
                                    <div className="hidden group-hover:block absolute z-50 left-1/2 -translate-x-1/2 -top-2 transform -translate-y-full bg-white text-gray-900 text-xs rounded shadow-lg p-2 min-w-[200px]">
                                      <div className="font-semibold mb-1 text-[#FFB900]">{opportunity.id}</div>
                                      <div className={isDarkMode ? "text-white" : "text-gray-600"}>{opportunity.description}</div>
                                      <div className="mt-1">
                                        <span className={isDarkMode ? "text-[#ffe066] font-medium" : "text-[#FFB900] font-medium"}>
                                          ${opportunityRevenue.toLocaleString()}
                                        </span>
                                        <span className="text-gray-500"> annual revenue</span>
                                      </div>
                                      <div className="text-gray-500 mb-2">{opportunity.seats} Copilot seats</div>
                                      <div className={isDarkMode ? "text-white ml-2" : "text-gray-500 ml-2"}>{opportunity.closeDate}</div>
                                      <div className="text-gray-500">Partner: {opportunity.partner}</div>
                                      <div className={`text-${confidenceColor} font-medium`}>Confidence: {opportunity.confidence}</div>
                                      {opportunity.notes && (
                                        <div className="mt-2 pt-2 border-t border-gray-200">
                                          <div className="text-gray-500 text-xs italic">Latest Notes:</div>
                                          <div className="text-gray-600 text-xs mt-1">{opportunity.notes}</div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="mt-2 flex justify-between items-center">
                              <div className="text-sm text-gray-600">
                                {progress.toFixed(1)}% ({customer.adoptedUsers}/{customer.totalUsers} Copilot seats)
                              </div>
                              {/* {customer.opportunities.length < 4 && (
                                <button
                                  onClick={() => addOpportunity(customer.id)}
                                  className="text-sm text-[#0078D4] hover:text-[#106EBE] flex items-center"
                                >
                                  <PlusIcon className="h-4 w-4 mr-1" />
                                  Add Opportunity
                                </button>
                              )} */}
                            </div>
                            {editingOpportunity.customerId === customer.id && (
                              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">Opportunity ID</label>
                                    <input
                                      type="text"
                                      value={editingOpportunity.opportunity?.id}
                                      onChange={(e) => setEditingOpportunity({
                                        ...editingOpportunity,
                                        opportunity: { ...editingOpportunity.opportunity!, id: e.target.value }
                                      })}
                                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <input
                                      type="text"
                                      value={editingOpportunity.opportunity?.description}
                                      onChange={(e) => setEditingOpportunity({
                                        ...editingOpportunity,
                                        opportunity: { ...editingOpportunity.opportunity!, description: e.target.value }
                                      })}
                                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">Seats</label>
                                    <input
                                      type="number"
                                      value={editingOpportunity.opportunity?.seats}
                                      onChange={(e) => setEditingOpportunity({
                                        ...editingOpportunity,
                                        opportunity: { ...editingOpportunity.opportunity!, seats: Number(e.target.value) }
                                      })}
                                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                  </div>
                                  <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Latest Notes</label>
                                    <textarea
                                      value={editingOpportunity.opportunity?.notes}
                                      onChange={(e) => setEditingOpportunity({
                                        ...editingOpportunity,
                                        opportunity: { ...editingOpportunity.opportunity!, notes: e.target.value }
                                      })}
                                      rows={3}
                                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                      placeholder="Add notes about this opportunity..."
                                    />
                                  </div>
                                </div>
                                <div className="mt-4 flex justify-end space-x-2">
                                  <button
                                    onClick={() => setEditingOpportunity({ customerId: '', opportunity: null })}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => updateOpportunity(customer.id, editingOpportunity.opportunity!)}
                                    className="px-4 py-2 bg-[#0078D4] text-white rounded-lg hover:bg-[#106EBE] transition-colors"
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            )}
                            {customer.opportunities.length > 0 && (
                              <div className="mt-4 space-y-2">
                                {customer.opportunities.map((opportunity, index) => {
                                  const dealSize = opportunity.seats * 30 * 12;
                                  const confidenceColor = {
                                    'Committed': 'text-green-600',
                                    'Commit with risk': 'text-yellow-600',
                                    'Upside': 'text-blue-600',
                                    'Non Commit': 'text-red-600'
                                  }[opportunity.confidence];
                                  
                                  return (
                                    <div key={opportunity.id} className="flex justify-between items-center text-sm">
                                      <div className="flex items-center">
                                        <div className={`w-3 h-3 rounded-full ${OPPORTUNITY_COLORS[index]} mr-2`} />
                                        <span className={isDarkMode ? "text-white" : "text-gray-600"}>
                                          {opportunity.id} - {opportunity.description} ({opportunity.seats} seats)
                                        </span>
                                        <span className="ml-2 text-[#FFB900] font-medium">
                                          ${dealSize.toLocaleString()} ARR
                                        </span>
                                        <span className={isDarkMode ? "text-white ml-2" : "text-gray-500 ml-2"}>
                                          | {opportunity.closeDate}
                                        </span>
                                        <span className={`ml-2 ${confidenceColor} font-medium`}>
                                          | {opportunity.confidence}
                                        </span>
                                      </div>
                                      {/* <button
                                        onClick={() => deleteOpportunity(customer.id, opportunity.id)}
                                        className="text-red-600 hover:text-red-700"
                                      >
                                        <TrashIcon className="h-4 w-4" />
                                      </button> */}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })
          ) : groupBy === 'quarter-partner' ? (
            Object.entries(getGroupedCustomers()).map(([quarter, customers]) => {
              const quarterARR = calculateQuarterARR(customers, quarter);
              
              // Get unique partners for this quarter
              const partners = new Set<string>();
              customers.forEach((customer: Customer) => {
                customer.opportunities.forEach((opp: Opportunity) => {
                  if (opp.closeDate === quarter) {
                    partners.add(opp.partner);
                  }
                });
              });

              return (
                <div key={quarter} className="mb-8 last:mb-0">
                  <div className="flex items-center mb-4">
                    <h2 className={isDarkMode ? "text-3xl font-semibold text-white" : "text-3xl font-semibold text-red-600"}>
                      {quarter}
                    </h2>
                    <span className="ml-4 text-xl font-medium text-red-600">
                      ${quarterARR.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      ({customers.length} customers)
                    </span>
                  </div>

                  <div className="ml-4 space-y-6">
                    {Array.from(partners).sort().map(partner => {
                      const partnerARR = calculateQuarterPartnerARR(customers, quarter, partner);
                      const opportunities = getQuarterPartnerOpportunities(customers, quarter, partner);

                      return (
                        <div key={partner} className="border-l-2 border-gray-200 pl-4">
                          <div className="flex items-center mb-2">
                            <h3 className="text-xl font-semibold text-[#0078D4]">
                              {partner}
                            </h3>
                            <span className="ml-4 text-lg font-medium text-[#0078D4]">
                              ${partnerARR.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                          </div>
                          <div className="space-y-2">
                            {opportunities.map(opportunity => {
                              const dealSize = opportunity.seats * 30 * 12;
                              const confidenceColor = {
                                'Committed': 'text-green-600',
                                'Commit with risk': 'text-yellow-600',
                                'Upside': 'text-blue-600',
                                'Non Commit': 'text-red-600'
                              }[opportunity.confidence];

                              return (
                                <div key={opportunity.id} className="flex items-center text-sm ml-4">
                                  <div className="w-3 h-3 rounded-full bg-[#FFB900] mr-2" />
                                  <span className={isDarkMode ? "text-white" : "text-gray-600"}>
                                    {opportunity.id} - {opportunity.description} ({opportunity.seats} seats)
                                  </span>
                                  <span className="ml-2 text-[#FFB900] font-medium">
                                    ${dealSize.toLocaleString()} ARR
                                  </span>
                                  <span className={isDarkMode ? "text-white ml-2" : "text-gray-500 ml-2"}>
                                    | {opportunity.closeDate}
                                  </span>
                                  <span className={`ml-2 ${confidenceColor} font-medium`}>
                                    | {opportunity.confidence}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            Object.entries(getGroupedCustomers()).map(([quarter, customers]) => {
              const quarterARR = calculateQuarterARR(customers, quarter);
              return (
                <div key={quarter} className="mb-8 last:mb-0">
                  <div className="flex items-center mb-4">
                    <h2 className={isDarkMode ? "text-3xl font-semibold text-white" : "text-3xl font-semibold text-red-600"}>
                      {quarter}
                    </h2>
                    <span className="ml-4 text-xl font-medium text-red-600">
                      ${quarterARR.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      ({customers.length} customers)
                    </span>
                  </div>
                  {customers.map((customer: Customer) => {
                    const progress = (customer.adoptedUsers / customer.totalUsers) * 100;
                    const annualRevenue = calculateAnnualRevenue(customer.adoptedUsers);
                    const opportunityRevenue = calculateOpportunityRevenue(customer.opportunities);
                    const potentialRevenue = calculatePotentialRevenue(customer.totalUsers, customer.adoptedUsers, customer.opportunities);
                    
                    return (
                      <div key={customer.id} className="mb-10 last:mb-0 pb-8 border-b border-gray-200 last:border-b-0">
                        {editingCustomer?.id === customer.id ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                  type="text"
                                  value={editingCustomer.name}
                                  onChange={(e) => setEditingCustomer({...editingCustomer, name: e.target.value})}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Total Users (Target)</label>
                                <input
                                  type="number"
                                  value={editingCustomer.totalUsers}
                                  onChange={(e) => setEditingCustomer({...editingCustomer, totalUsers: Number(e.target.value)})}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Adopted Users (Current)</label>
                                <input
                                  type="number"
                                  value={editingCustomer.adoptedUsers}
                                  onChange={(e) => setEditingCustomer({...editingCustomer, adoptedUsers: Number(e.target.value)})}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                            </div>
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => setEditingCustomer(null)}
                                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => updateCustomer(editingCustomer)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center space-x-2">
                                  <h3 className="text-lg font-semibold text-[#0078D4]">{customer.name}</h3>
                                  {customer.stakeholders && customer.stakeholders.length > 0 && (
                                    <span className={isDarkMode ? "text-white" : "text-gray-500"}>
                                      {customer.stakeholders.map((s, i) => (
                                        <span key={i} className="ml-1 first:ml-0">
                                          {s.name} ({s.role}){i !== customer.stakeholders.length - 1 && <span>,</span>}
                                        </span>
                                      ))}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="text-right">
                                  <div className="text-sm text-gray-600">
                                    ${annualRevenue.toLocaleString()} current ARR
                                  </div>
                                  {opportunityRevenue > 0 && (
                                    <div className="text-sm text-[#FFB900]">
                                      +${opportunityRevenue.toLocaleString()} opportunity ARR
                                    </div>
                                  )}
                                  <div className="text-sm text-[#7FBA00]">
                                    +${potentialRevenue.toLocaleString()} potential ARR
                                  </div>
                                </div>
                                {/* <button
                                  onClick={() => handleEdit(customer)}
                                  className="text-gray-400 hover:text-[#0078D4]"
                                >
                                  <PencilIcon className="h-5 w-5" />
                                </button>
                                <button
                                  onClick={() => deleteCustomer(customer.id)}
                                  className="text-gray-400 hover:text-[#F25022]"
                                >
                                  <TrashIcon className="h-5 w-5" />
                                </button> */}
                              </div>
                            </div>
                            <div className="relative h-8 bg-gray-200 rounded-full overflow-visible flex">
                              {/* Adopted Users (Microsoft Green) */}
                              <div
                                className="h-full bg-gradient-to-r from-[#7FBA00] to-[#5E9C00] transition-all duration-500"
                                style={{ width: `${progress}%` }}
                              />
                              {/* Opportunities (Microsoft Yellow) */}
                              {customer.opportunities.map((opportunity, index) => {
                                const opportunityProgress = (opportunity.seats / customer.totalUsers) * 100;
                                const opportunityRevenue = opportunity.seats * 30 * 12;
                                const confidenceColor = {
                                  'Committed': 'text-green-600',
                                  'Commit with risk': 'text-yellow-600',
                                  'Upside': 'text-blue-600',
                                  'Non Commit': 'text-red-600'
                                }[opportunity.confidence];
                                
                                return (
                                  <div
                                    key={opportunity.id}
                                    className={`h-full ${OPPORTUNITY_COLORS[index]} transition-all duration-500 relative group cursor-pointer`}
                                    style={{ width: `${opportunityProgress}%` }}
                                  >
                                    <div className="hidden group-hover:block absolute z-50 left-1/2 -translate-x-1/2 -top-2 transform -translate-y-full bg-white text-gray-900 text-xs rounded shadow-lg p-2 min-w-[200px]">
                                      <div className="font-semibold mb-1 text-[#FFB900]">{opportunity.id}</div>
                                      <div className={isDarkMode ? "text-white" : "text-gray-600"}>{opportunity.description}</div>
                                      <div className="mt-1">
                                        <span className={isDarkMode ? "text-[#ffe066] font-medium" : "text-[#FFB900] font-medium"}>
                                          ${opportunityRevenue.toLocaleString()}
                                        </span>
                                        <span className="text-gray-500"> annual revenue</span>
                                      </div>
                                      <div className="text-gray-500 mb-2">{opportunity.seats} Copilot seats</div>
                                      <div className={isDarkMode ? "text-white ml-2" : "text-gray-500 ml-2"}>{opportunity.closeDate}</div>
                                      <div className="text-gray-500">Partner: {opportunity.partner}</div>
                                      <div className={`text-${confidenceColor} font-medium`}>Confidence: {opportunity.confidence}</div>
                                      {opportunity.notes && (
                                        <div className="mt-2 pt-2 border-t border-gray-200">
                                          <div className="text-gray-500 text-xs italic">Latest Notes:</div>
                                          <div className="text-gray-600 text-xs mt-1">{opportunity.notes}</div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="mt-2 flex justify-between items-center">
                              <div className="text-sm text-gray-600">
                                {progress.toFixed(1)}% ({customer.adoptedUsers}/{customer.totalUsers} Copilot seats)
                              </div>
                              {/* {customer.opportunities.length < 4 && (
                                <button
                                  onClick={() => addOpportunity(customer.id)}
                                  className="text-sm text-[#0078D4] hover:text-[#106EBE] flex items-center"
                                >
                                  <PlusIcon className="h-4 w-4 mr-1" />
                                  Add Opportunity
                                </button>
                              )} */}
                            </div>
                            {editingOpportunity.customerId === customer.id && (
                              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">Opportunity ID</label>
                                    <input
                                      type="text"
                                      value={editingOpportunity.opportunity?.id}
                                      onChange={(e) => setEditingOpportunity({
                                        ...editingOpportunity,
                                        opportunity: { ...editingOpportunity.opportunity!, id: e.target.value }
                                      })}
                                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <input
                                      type="text"
                                      value={editingOpportunity.opportunity?.description}
                                      onChange={(e) => setEditingOpportunity({
                                        ...editingOpportunity,
                                        opportunity: { ...editingOpportunity.opportunity!, description: e.target.value }
                                      })}
                                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700">Seats</label>
                                    <input
                                      type="number"
                                      value={editingOpportunity.opportunity?.seats}
                                      onChange={(e) => setEditingOpportunity({
                                        ...editingOpportunity,
                                        opportunity: { ...editingOpportunity.opportunity!, seats: Number(e.target.value) }
                                      })}
                                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                  </div>
                                  <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Latest Notes</label>
                                    <textarea
                                      value={editingOpportunity.opportunity?.notes}
                                      onChange={(e) => setEditingOpportunity({
                                        ...editingOpportunity,
                                        opportunity: { ...editingOpportunity.opportunity!, notes: e.target.value }
                                      })}
                                      rows={3}
                                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                      placeholder="Add notes about this opportunity..."
                                    />
                                  </div>
                                </div>
                                <div className="mt-4 flex justify-end space-x-2">
                                  <button
                                    onClick={() => setEditingOpportunity({ customerId: '', opportunity: null })}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => updateOpportunity(customer.id, editingOpportunity.opportunity!)}
                                    className="px-4 py-2 bg-[#0078D4] text-white rounded-lg hover:bg-[#106EBE] transition-colors"
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            )}
                            {customer.opportunities.length > 0 && (
                              <div className="mt-4 space-y-2">
                                {customer.opportunities.map((opportunity, index) => {
                                  const dealSize = opportunity.seats * 30 * 12;
                                  const confidenceColor = {
                                    'Committed': 'text-green-600',
                                    'Commit with risk': 'text-yellow-600',
                                    'Upside': 'text-blue-600',
                                    'Non Commit': 'text-red-600'
                                  }[opportunity.confidence];
                                  
                                  return (
                                    <div key={opportunity.id} className="flex justify-between items-center text-sm">
                                      <div className="flex items-center">
                                        <div className={`w-3 h-3 rounded-full ${OPPORTUNITY_COLORS[index]} mr-2`} />
                                        <span className={isDarkMode ? "text-white" : "text-gray-600"}>
                                          {opportunity.id} - {opportunity.description} ({opportunity.seats} seats)
                                        </span>
                                        <span className="ml-2 text-[#FFB900] font-medium">
                                          ${dealSize.toLocaleString()} ARR
                                        </span>
                                        <span className={isDarkMode ? "text-white ml-2" : "text-gray-500 ml-2"}>
                                          | {opportunity.closeDate}
                                        </span>
                                        <span className={`ml-2 ${confidenceColor} font-medium`}>
                                          | {opportunity.confidence}
                                        </span>
                                      </div>
                                      {/* <button
                                        onClick={() => deleteOpportunity(customer.id, opportunity.id)}
                                        className="text-red-600 hover:text-red-700"
                                      >
                                        <TrashIcon className="h-4 w-4" />
                                      </button> */}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
} 