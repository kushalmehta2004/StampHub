import React, { useState, useEffect } from 'react';
import { 
  Wallet, 
  Plus, 
  Minus, 
  CreditCard,
  History,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  TrendingUp,
  RefreshCw,
  Download
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const WalletPage = () => {
  const { user, updateUser } = useAuth();
  const [walletBalance, setWalletBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState('');
  const [isDepositing, setIsDepositing] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [showDepositModal, setShowDepositModal] = useState(false);

  useEffect(() => {
    // Get wallet balance from localStorage or user data
    const storedBalance = localStorage.getItem(`wallet_${user?.id}`);
    if (storedBalance) {
      setWalletBalance(parseFloat(storedBalance));
    } else if (user?.walletBalance !== undefined) {
      setWalletBalance(user.walletBalance);
    }

    // Load transaction history
    const storedTransactions = localStorage.getItem(`transactions_${user?.id}`);
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, [user]);

  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (parseFloat(depositAmount) > 50000) {
      toast.error('Maximum deposit amount is ₹50,000');
      return;
    }

    setIsDepositing(true);

    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const amount = parseFloat(depositAmount);
      const newBalance = walletBalance + amount;

      // Create new transaction
      const newTransaction = {
        id: 'TXN' + Date.now(),
        type: 'deposit',
        amount: amount,
        description: 'Wallet deposit',
        date: new Date().toISOString(),
        status: 'completed',
        method: 'Wallet Deposit'
      };

      const updatedTransactions = [newTransaction, ...transactions];

      // Update state
      setWalletBalance(newBalance);
      setTransactions(updatedTransactions);
      setDepositAmount('');
      setShowDepositModal(false);

      // Save to localStorage
      localStorage.setItem(`wallet_${user?.id}`, newBalance.toString());
      localStorage.setItem(`transactions_${user?.id}`, JSON.stringify(updatedTransactions));

      // Update user context if needed
      if (updateUser) {
        updateUser({ ...user, walletBalance: newBalance });
      }

      toast.success(`₹${amount} deposited successfully!`);
    } catch (error) {
      toast.error('Deposit failed. Please try again.');
    } finally {
      setIsDepositing(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="w-5 h-5 text-green-600" />;
      case 'purchase':
        return <ArrowUpRight className="w-5 h-5 text-red-600" />;
      default:
        return <DollarSign className="w-5 h-5 text-blue-600" />;
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'deposit':
        return 'text-green-600';
      case 'purchase':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  // Quick deposit amounts - can be made configurable via admin
  const quickDepositAmounts = [100, 500, 1000, 2000, 5000];

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">My Wallet</h1>
            <p className="text-secondary-600 mt-1">Manage your wallet balance and transactions</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="btn-outline btn-sm">
              <Download className="w-4 h-4 mr-2" />
              Statement
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="btn-outline btn-sm"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Wallet Balance Card */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="card-body text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-sm font-medium text-secondary-600 mb-2">Available Balance</h2>
                <p className="text-4xl font-bold text-secondary-900 mb-6">
                  {formatCurrency(walletBalance)}
                </p>
                
                <button
                  onClick={() => setShowDepositModal(true)}
                  className="btn-primary w-full mb-4"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Money
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-1" />
                    <p className="text-xs text-green-600 font-medium">Total Deposits</p>
                    <p className="text-sm font-bold text-green-700">
                      {formatCurrency(transactions.filter(t => t.type === 'deposit').reduce((sum, t) => sum + t.amount, 0))}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <History className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                    <p className="text-xs text-blue-600 font-medium">Transactions</p>
                    <p className="text-sm font-bold text-blue-700">{transactions.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="card-header">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-secondary-900">Transaction History</h3>
                  <div className="flex items-center space-x-2">
                    <select className="input text-sm">
                      <option>All Transactions</option>
                      <option>Deposits</option>
                      <option>Purchases</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="card-body p-0">
                {transactions.length > 0 ? (
                  <div className="divide-y divide-secondary-200">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="p-6 hover:bg-secondary-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                              {getTransactionIcon(transaction.type)}
                            </div>
                            <div>
                              <h4 className="font-medium text-secondary-900">{transaction.description}</h4>
                              <div className="flex items-center space-x-4 mt-1">
                                <p className="text-sm text-secondary-500">{transaction.id}</p>
                                <p className="text-sm text-secondary-500">{formatDate(transaction.date)}</p>
                                {transaction.method && (
                                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                                    {transaction.method}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-lg font-bold ${getTransactionColor(transaction.type)}`}>
                              {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                            </p>
                            <div className="flex items-center mt-1">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                              <span className="text-sm text-green-600 capitalize">{transaction.status}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <History className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-secondary-900 mb-2">No transactions yet</h3>
                    <p className="text-secondary-600">Your transaction history will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Deposit Modal */}
        {showDepositModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowDepositModal(false)}></div>
              </div>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <Plus className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Add Money to Wallet</h3>
                      <p className="text-sm text-gray-500">Deposit money for stamp purchases</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Current Balance */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-900">Current Balance</span>
                        <span className="text-lg font-bold text-blue-900">{formatCurrency(walletBalance)}</span>
                      </div>
                    </div>

                    {/* Quick Amount Buttons */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quick Select</label>
                      <div className="grid grid-cols-5 gap-2">
                        {quickDepositAmounts.map((amount) => (
                          <button
                            key={amount}
                            onClick={() => setDepositAmount(amount.toString())}
                            className={`py-2 px-3 text-sm border rounded-lg transition-colors ${
                              depositAmount === amount.toString()
                                ? 'border-primary-500 bg-primary-50 text-primary-700'
                                : 'border-secondary-300 text-secondary-700 hover:bg-secondary-50'
                            }`}
                          >
                            ₹{amount}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Amount */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Or Enter Amount</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">₹</span>
                        </div>
                        <input
                          type="number"
                          placeholder="0"
                          min="1"
                          max="50000"
                          className="input pl-8 w-full"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Minimum: ₹1, Maximum: ₹50,000</p>
                    </div>

                    {/* Payment Method Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
                        <div>
                          <h4 className="text-sm font-medium text-blue-900">Secure Payment</h4>
                          <p className="text-xs text-blue-700">Your payment will be processed securely</p>
                        </div>
                      </div>
                    </div>

                    {/* New Balance Preview */}
                    {depositAmount && (
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-green-900">New Balance</span>
                          <span className="text-lg font-bold text-green-900">
                            {formatCurrency(walletBalance + parseFloat(depositAmount || 0))}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={handleDeposit}
                    disabled={!depositAmount || isDepositing || parseFloat(depositAmount) <= 0}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDepositing ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Deposit {depositAmount && `₹${depositAmount}`}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDepositModal(false)}
                    disabled={isDepositing}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletPage;