// API Request Types (matching backend DTOs)
export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface OTPRequest {
  email: string;
  otp: string;
}

export interface GoogleAuthRequest {
  token: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyResetCodeRequest {
  email: string;
  resetCode: string;
}

export interface ResetPasswordRequest {
  email: string;
  resetCode: string;
  newPassword: string;
  confirmPassword: string;
}

// API Response Types (matching backend DTOs)
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface UserResponse {
  id: string;
  email: string;
  username: string;
  verified: boolean;
  authProvider: 'LOCAL' | 'GOOGLE';
  roles: ('USER' | 'ADMIN')[];
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: UserResponse;
}

// Frontend User Interface (for context)
export interface User {
  id: string;
  email: string;
  username: string;
  verified: boolean;
  authProvider: 'LOCAL' | 'GOOGLE';
  roles: ('USER' | 'ADMIN')[];
  createdAt: string;
  token: string;
}

// Invoice Types
export interface InvoiceRequest {
  customerName: string;
  customerEmail: string;
  projectName: string;
  quantity: number;
  price: number;
  discountPercentage: number;
  taxPercentage: number;
  dueDate: string; // ISO date string
}

export interface InvoiceResponse {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  projectName: string;
  quantity: number;
  price: number;
  discountPercentage: number;
  taxPercentage: number;
  subtotal: number;
  discountAmount: number;
  taxableAmount: number;
  taxAmount: number;
  totalAmount: number;
  dueDate: string;
  status: 'PENDING' | 'PAID' | 'UNPAID' | 'OVERDUE' | 'CANCELLED';
  overdue: boolean;
  emailSent: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceStats {
  totalInvoices: number;
  paidInvoices: number;
  unpaidInvoices: number;
  pendingInvoices: number;
  overdueInvoices: number;
}

// Expense Management Types
export type ExpenseCategory =
  | 'SALARY'
  | 'HARDWARE'
  | 'SOFTWARE'
  | 'OFFICE_RENT'
  | 'UTILITIES'
  | 'TRAVEL'
  | 'MARKETING'
  | 'TRAINING'
  | 'LEGAL'
  | 'INSURANCE'
  | 'MAINTENANCE'
  | 'MISCELLANEOUS';

export interface ExpenseRequest {
  title: string;
  category: ExpenseCategory;
  amount: number;
  expenseDate: string; // ISO date string
  notes?: string;
}

export interface ExpenseResponse {
  id: string;
  title: string;
  category: ExpenseCategory;
  amount: number;
  expenseDate: string; // ISO date string
  notes?: string;
  createdBy: string;
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
}

export interface MonthlyExpenseData {
  month: string; // YYYY-MM format
  amount: number;
  count: number;
}

export interface ExpenseSummary {
  total: number;
  count: number;
  averagePerTransaction: number;
}

export interface ExpenseAnalyticsResponse {
  totalExpenses: number;
  totalTransactions: number;
  categoryBreakdown: Record<string, number>; // Category name -> Total amount
  monthlyBreakdown: Record<string, number>; // Month (YYYY-MM) -> Total amount
  monthlyTrends: MonthlyExpenseData[];
  currentMonth: ExpenseSummary;
  lastMonth: ExpenseSummary;
}

// Offer Letter Management Types
export type OfferStatus = 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';

export interface OfferRequest {
  candidateName: string;
  candidateEmail: string;
  role: string;
  joiningDate: string; // ISO date string (YYYY-MM-DD)
  location: string;
  trialPeriod: string;
  address?: string; // Optional
}

export interface OfferResponse {
  id: string;
  candidateName: string;
  candidateEmail: string;
  role: string;
  joiningDate: string; // ISO date string
  location: string;
  trialPeriod: string;
  address?: string;
  status: OfferStatus;
  createdBy: string;
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
  sentAt?: string; // ISO datetime string
  emailSent: boolean;
  emailSentAt?: string; // ISO datetime string
  emailSubject?: string;
  pdfFileName?: string;
}

export interface OfferStats {
  totalOffers: number;
  draftOffers: number;
  sentOffers: number;
  acceptedOffers: number;
  rejectedOffers: number;
  expiredOffers: number;
  offersThisMonth: number;
  recentOffers: OfferResponse[];
}

// Error Response Type
export interface ErrorResponse {
  success: false;
  message: string;
  data: any;
  timestamp: string;
}

// Projects & Purchases (Phase 1 focuses on Projects)
export interface ProjectRequest {
  title: string;
  slug?: string;
  shortDescription?: string;
  description?: string;
  price?: number;
  currency?: string; // default INR
  category?: string;
  tags?: string[];
  thumbnailUrl?: string;
  active?: boolean;
}

export interface ProjectResponse {
  id: string;
  slug: string;
  title: string;
  shortDescription?: string;
  description?: string;
  price: number;
  currency: string;
  category?: string;
  tags?: string[];
  thumbnailUrl?: string;
  active: boolean;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
  // Abstract file fields
  hasAbstract?: boolean;
  abstractFileName?: string;
  abstractFileType?: string;
  abstractFileSize?: number;
}

// Purchase Types
export interface PurchaseRequest {
  projectId: string;
  notes?: string;
}

export interface PurchaseResponse {
  id: string;
  userId: string;
  username: string;
  userEmail: string;
  projectId: string;
  projectTitle: string;
  projectPrice: number;
  projectCurrency: string;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  notes?: string;
  proofFileName?: string;
  proofUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Gallery Types
export interface GalleryResponse {
  id: string;
  src: string;
  thumb: string;
  title: string;
  category: string;
  description: string;
  createdAt: string;
}