// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { Eye, EyeOff, Bell, Calendar, Filter, Home, Settings, Users, Briefcase, MessageCircle, BarChart2, DollarSign, Menu, LogOut, X, UserCircle2, Mail, PhoneCall, FileText, CheckSquare } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"

const patients = [
  { id: 1, name: 'Annette Brave', gender: 'F', age: 67, condition: 'DM2, HTN +12', priority: '01', raf: 13.234, risk: 'Highest', status: 'In-progress', awvStatus: 'Due', billable: '-', cohorts: ['High risk', 'High cost'], action: 'Initiate AWV' },
  { id: 2, name: 'Rivian Mayor', gender: 'M', age: 58, condition: 'HTN +9', priority: '12', raf: 12.211, risk: 'High', status: 'In-progress', awvStatus: 'Completed', billable: '$168', cohorts: ['Red flag'], action: '' },
  { id: 3, name: 'Vive Neymar', gender: 'M', age: 58, condition: 'HTN +9', priority: '12', raf: 12.211, risk: 'High', status: 'In-progress', awvStatus: 'Patient Declined', billable: '-', cohorts: ['Red flag'], action: 'Set Reminder' },
  { id: 4, name: 'Diva Slayer', gender: 'F', age: 58, condition: 'HTN +9', priority: '12', raf: 12.211, risk: 'High', status: 'In-progress', awvStatus: 'Scheduled 2/2/24', billable: '-', cohorts: [], action: 'Initiate AWV' },
  { id: 5, name: 'Diva Slayer', gender: 'F', age: 58, condition: 'HTN +9', priority: '12', raf: 12.211, risk: 'High', status: 'In-progress', awvStatus: 'Claim generated (2/2/24)', billable: '-', cohorts: [], action: '' },
]

const patientListData = [
  { id: 110, name: 'Annette Brave', age: 78, gender: 'F', risk: 'Highest', alerts: 5, raf: 1.234, summary: 'Severe sepsis, high fever 103°F, elevated lactate levels. High cost, multiple ICU admissions. Immediate intervention needed.' },
  { id: 2897, name: 'Sarah Dorathy', age: 78, gender: 'F', risk: 'Highest', alerts: 1, raf: 1.567, summary: 'Critical heart failure, ejection fraction 25%, recent cardiac arrest. Elevated cost, frequent hospitalizations. Urgent care required.' },
  { id: 4536, name: 'Zayne Wills', age: 68, gender: 'F', risk: 'High', alerts: 5, raf: 0.987, summary: 'Rapid deterioration, acute renal failure, elevated creatinine, ongoing dialysis. High utilization, frequent treatments. Needs urgent attention.' },
  { id: 1986, name: 'Jerome Bell', age: 58, gender: 'M', risk: 'High', alerts: 2, raf: 1.123, summary: 'Major abdominal surgery, signs of infection, elevated white blood cell count, severe pain. High cost, post-op complications. Requires immediate care.' },
  { id: 1728, name: 'Lesy Rey', age: 58, gender: 'F', risk: 'High', alerts: 5, raf: 0.876, summary: 'Unstable blood glucose, recent diabetic ketoacidosis, multiple insulin adjustments. High cost, prolonged hospital stays. Needs urgent monitoring.' },
]

const appointments = [
  { time: '8:00 AM', patient: 'Vienna Brave', type: 'ER Follow-up', status: 'Pending' },
  { time: '9:00 AM', patient: 'Sarah Dorothy', type: 'Virtual Appointment', status: 'Pending' },
  { time: '10:00 AM', patient: 'Emily Anderson', type: 'Check-up', status: 'Pending' },
  { time: '11:00 AM', patient: 'Jenny Wilkinson', type: 'Severe Treatment', status: 'Pending' },
  { time: '12:00 PM', patient: 'Michael Johnson', type: 'Check-up', status: 'Confirmed' },
  { time: '2:00 PM', patient: 'Robert Smith', type: 'Lab Results Review', status: 'Confirmed' },
]

const assignedTasks = [
  { type: 'call', name: 'Justin', description: 'Missed call', time: '9 mins ago' },
  { type: 'message', name: 'Jane Cooper', description: 'That sounds fantastic', time: '2 hrs ago' },
  { type: 'voice', name: 'Justin', description: 'Voice mail', time: 'Yesterday' },
  { type: 'note', name: 'Ana', description: 'That helps. Thanks!', time: '02/11 9:30am' },
  { type: 'email', name: 'Savannah Nguyen', description: 'Regarding Registration documents', time: '02/11 9:30am' },
]

const themes = [
  { name: 'Light', value: 'light' },
  { name: 'Dark', value: 'dark' },
  { name: 'Zinc', value: 'zinc' },
  { name: 'Slate', value: 'slate' },
  { name: 'Stone', value: 'stone' },
  { name: 'Gray', value: 'gray' },
  { name: 'Neutral', value: 'neutral' },
  { name: 'Red', value: 'red' },
  { name: 'Rose', value: 'rose' },
  { name: 'Orange', value: 'orange' },
  { name: 'Green', value: 'green' },
  { name: 'Blue', value: 'blue' },
  { name: 'Yellow', value: 'yellow' },
  { name: 'Violet', value: 'violet' },
]

function CommunicationTab({ patient }) {
  const communications = [
    { id: 1, type: 'care', name: 'Care for Williamy Jammy', message: '@Rio he is having some stomach aches lately.', time: 'Now' },
    { id: 2, type: 'message', name: 'Robyn Friesen', message: 'You: Sure thing, I\'ll have a look today. They\'re looking great!', time: 'Now' },
    { id: 3, type: 'email', name: 'Natalie Welch', message: 'Health document', time: '3:45 PM' },
    { id: 4, type: 'appointment', name: 'Kristen Fay', message: 'Patient\'s appointment booked successful', time: 'Saturday' },
    { id: 5, type: 'call', name: 'Natalie Welch', message: 'Missed Call', time: 'Saturday' },
  ]

  const getIcon = (type) => {
    switch (type) {
      case 'care': return <UserCircle2 className="h-4 w-4" />;
      case 'message': return <MessageCircle className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'appointment': return <Calendar className="h-4 w-4" />;
      case 'call': return <PhoneCall className="h-4 w-4" />;
      default: return null;
    }
  }

  return (
    <ScrollArea className="h-[calc(100vh-300px)]">
      <div className="space-y-2">
        {communications.map((comm) => (
          <Card key={comm.id} className="p-2">
            <div className="flex items-start space-x-2">
              <div className={`rounded-full p-1 ${comm.type === 'call' ? 'bg-red-100' : 'bg-gray-100'}`}>
                {getIcon(comm.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{comm.name}</p>
                <p className="text-xs text-gray-500 truncate">{comm.message}</p>
              </div>
              <div className="text-xs text-gray-500">{comm.time}</div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}

function CareNoteTab({ patient }) {
  const careNotes = [
    { id: 1, title: 'Initial Assessment', content: 'Patient presented with severe abdominal pain...', date: '2023-06-15' },
    { id: 2, title: 'Follow-up Visit', content: 'Pain has subsided, but patient reports occasional discomfort...', date: '2023-06-22' },
    { id: 3, title: 'Medication Adjustment', content: 'Increased dosage of pain medication...', date: '2023-06-29' },
  ]

  return (
    <ScrollArea className="h-[calc(100vh-300px)]">
      <div className="space-y-2">
        {careNotes.map((note) => (
          <Card key={note.id} className="p-2">
            <div className="flex items-start space-x-2">
              <FileText className="h-4 w-4 text-primary" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold">{note.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{note.content}</p>
                <p className="text-xs text-gray-400 mt-1">{note.date}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}

function TasksTab({ patient }) {
  const tasks = [
    { id: 1, title: 'Schedule follow-up appointment', status: 'Pending', dueDate: '2023-07-05' },
    { id: 2, title: 'Review lab results', status: 'Completed', dueDate: '2023-07-02' },
    { id: 3, title: 'Update medication list', status: 'In Progress', dueDate: '2023-07-08' },
  ]

  return (
    <ScrollArea className="h-[calc(100vh-300px)]">
      <div className="space-y-2">
        {tasks.map((task) => (
          <Card key={task.id} className="p-2">
            <div className="flex items-start space-x-2">
              <CheckSquare className="h-4 w-4 text-primary" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold">{task.title}</h4>
                <div className="flex justify-between items-center mt-1">
                  <Badge variant={task.status === 'Completed' ? 'default' : 'outline'}>{task.status}</Badge>
                  <p className="text-xs text-gray-400">Due: {task.dueDate}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}

function PatientDetails({ patient, onClose }) {
  return (
    <Card className="absolute top-0 right-0 w-1/3 h-full z-10 overflow-auto">
      <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-background z-20 p-2">
        <div>
          <CardTitle className="text-lg">{patient.name} ({patient.gender}, {patient.age})</CardTitle>
          <CardDescription className="text-xs">{patient.condition}</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-2">
        <Tabs defaultValue="alerts">
          <TabsList className="mb-2 sticky top-12 bg-background z-10">
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="careNote">Care Note</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>
          <TabsContent value="alerts">
            <div className="space-y-2">
              <Card>
                <CardHeader className="p-2">
                  <CardTitle className="text-sm font-medium">HRA submitted</CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <p className="text-xs text-muted-foreground">Critical • Onboarding protocol • 8 hrs • Source</p>
                  <Button className="mt-2" size="sm">Review</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="p-2">
                  <CardTitle className="text-sm font-medium">Contact information missing</CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <p className="text-xs text-muted-foreground">Critical • Onboarding protocol • 8 hrs • Source</p>
                  <Button className="mt-2" size="sm">Review</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="communication">
            <CommunicationTab patient={patient} />
          </TabsContent>
          <TabsContent value="careNote">
            <CareNoteTab patient={patient} />
          </TabsContent>
          <TabsContent value="tasks">
            <TasksTab patient={patient} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function PatientAlertDetails({ patient, onClose }) {
  const patientAlerts = [
    { id: 1, type: 'Pending', description: 'HRA submitted', category: 'Critical', protocol: 'Onboarding protocol', time: '8 hrs', source: 'Source', action: 'Review' },
    { id: 2, type: 'Pending', description: 'Contact information missing', category: 'Critical', protocol: 'Onboarding protocol', time: '8 hrs', source: 'Source', action: 'Review' },
    { id: 3, type: 'Diagnosis gaps', description: 'Morbid Obesity', details: 'HCC 22 (0.273) • RAF 0.513 (+0.5) • 1d • Source', action: 'Accept' },
    { id: 4, type: 'Care Gaps', description: 'Annual wellness visit due', category: 'Critical', protocol: 'Care protocol', time: '8 hrs', source: 'Source', action: 'Initiate' },
  ]

  return (
    <Card className="absolute top-0 right-0 w-1/3 h-full z-10 overflow-auto">
      <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-background z-20 p-2">
        <div>
          <CardTitle className="text-lg">{patient.name} ({patient.gender}, {patient.age})</CardTitle>
          <CardDescription className="text-xs mt-1">{patient.summary}</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-2">
        <Tabs defaultValue="alerts">
          <TabsList className="mb-2 sticky top-16 bg-background z-10">
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="careNote">Care Note</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>
          <TabsContent value="alerts">
            <ScrollArea className="h-[calc(100vh-300px)]">
              {patientAlerts.map((alert) => (
                <div key={alert.id} className="mb-2 p-2 border rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <Badge variant={alert.type === 'Pending' ? 'secondary' : 'outline'}>{alert.type}</Badge>
                      <h4 className="text-sm font-semibold mt-1">{alert.description}</h4>
                    </div>
                    <Button variant="secondary" size="sm">{alert.action}</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {alert.category && <span className="text-red-500 dark:text-red-400 mr-1">{alert.category}</span>}
                    {alert.protocol && <span>{alert.protocol} • </span>}
                    {alert.time && <span>{alert.time} • </span>}
                    {alert.source && <span>{alert.source}</span>}
                  </p>
                  {alert.details && <p className="mt-1 text-xs">{alert.details}</p>}
                </div>
              ))}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="communication">
            <CommunicationTab patient={patient} />
          </TabsContent>
          <TabsContent value="careNote">
            <CareNoteTab patient={patient} />
          </TabsContent>
          <TabsContent value="tasks">
            <TasksTab patient={patient} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export function DashboardComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [activeView, setActiveView] = useState('home')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [theme, setTheme] = useState('light')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPatients, setSelectedPatients] = useState([])
  const [showAlertDetails, setShowAlertDetails] = useState(false)

  useEffect(() => {
    document.documentElement.className = theme
  }, [theme])

  const handleLogin = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }
    setIsLoggedIn(true)
    setActiveView('home')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setEmail('')
    setPassword('')
    setError('')
    setActiveView('home')
  }

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient)
  }

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
  }

  const togglePatientSelection = (patientId) => {
    setSelectedPatients(prev => 
      prev.includes(patientId)
        ? prev.filter(id => id !== patientId)
        : [...prev, patientId]
    )
  }

  const handleAlertClick = (patient) => {
    setSelectedPatient(patient)
    setShowAlertDetails(true)
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8" style={{ fontFamily: 'Inter, sans-serif' }}>
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Login to LexiHealth</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full">
                Log in
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button variant="link" className="text-sm text-muted-foreground hover:text-primary">
              Forgot password?
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Don't have an account?{' '}
              <Button variant="link" className="text-sm text-primary hover:text-primary/80">
                Sign up
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <div className={`bg-card border-r border-border flex flex-col items-center py-2 ${isSidebarOpen ? 'w-40' : 'w-14'} transition-all duration-300 ease-in-out`}>
        <Button variant="ghost" size="icon" className="mb-2" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Menu className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="mb-2 w-full flex justify-start px-2" onClick={() => setActiveView('home')}>
          <Home className="h-5 w-5" />
          {isSidebarOpen && <span className="ml-2 text-xs">Home</span>}
        </Button>
        <Button variant="ghost" size="icon" className="mb-2 w-full flex justify-start px-2" onClick={() => setActiveView('patients')}>
          <Users className="h-5 w-5" />
          {isSidebarOpen && <span className="ml-2 text-xs">Patients</span>}
        </Button>
        <Button variant="ghost" size="icon" className="mb-2 w-full flex justify-start px-2">
          <Calendar className="h-5 w-5" />
          {isSidebarOpen && <span className="ml-2 text-xs">Calendar</span>}
        </Button>
        <Button variant="ghost" size="icon" className="mb-2 w-full flex justify-start px-2">
          <Briefcase className="h-5 w-5" />
          {isSidebarOpen && <span className="ml-2 text-xs">Tasks</span>}
        </Button>
        <Button variant="ghost" size="icon" className="mb-2 w-full flex justify-start px-2">
          <MessageCircle className="h-5 w-5" />
          {isSidebarOpen && <span className="ml-2 text-xs">Messages</span>}
        </Button>
        <Button variant="ghost" size="icon" className="mb-2 w-full flex justify-start px-2">
          <BarChart2 className="h-5 w-5" />
          {isSidebarOpen && <span className="ml-2 text-xs">Analytics</span>}
        </Button>
        <Button variant="ghost" size="icon" className="mb-2 w-full flex justify-start px-2">
          <DollarSign className="h-5 w-5" />
          {isSidebarOpen && <span className="ml-2 text-xs">Billing</span>}
        </Button>
        <Button variant="ghost" size="icon" className="mt-auto w-full flex justify-start px-2">
          <Settings className="h-5 w-5" />
          {isSidebarOpen && <span className="ml-2 text-xs">Settings</span>}
        </Button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border p-2 flex justify-between items-center">
          <h1 className="text-xl font-bold">LexiHealth</h1>
          <div className="flex items-center space-x-2">
            <Input
              type="search"
              placeholder="Search Patients"
              className="w-48 h-8 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline" size="sm">Ask Unity</Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Bell className="h-4 w-4" />
            </Button>
            <Button size="sm">+ New</Button>
            <Button variant="outline" size="sm">Schedule</Button>
            <Select value={theme} onValueChange={handleThemeChange}>
              <SelectTrigger className="w-[100px] h-8">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                {themes.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2">
                <div className="flex items-center space-x-2 mb-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{email}</p>
                    <p className="text-xs text-muted-foreground">Health Professional</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mb-1">
                  View Profile
                </Button>
                <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </header>

        {/* Dashboard content */}
        {activeView === 'home' && (
          <div className="flex-1 p-4 flex space-x-4 overflow-hidden">
            {/* Patient list */}
            <div className="w-2/3 bg-card rounded-lg shadow overflow-hidden flex flex-col">
              <div className="p-2 border-b border-border flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <h2 className="text-base font-semibold">My Dashboard</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                  <Select>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="AWV Completed : 15" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completed">AWV Completed : 15</SelectItem>
                      <SelectItem value="declined">AWV Declined : 2</SelectItem>
                      <SelectItem value="scheduled">AWV Scheduled : 5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <ScrollArea className="flex-1">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Risk</TableHead>
                      <TableHead className="w-[200px]">Name</TableHead>
                      <TableHead>Alerts</TableHead>
                      <TableHead>RAF Score</TableHead>
                      <TableHead>Summary of alerts</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patientListData.map((patient) => (
                      <TableRow key={patient.id} className="cursor-pointer" onClick={() => handleAlertClick(patient)}>
                        <TableCell>{patient.id}</TableCell>
                        <TableCell>
                          <Badge variant={patient.risk === 'Highest' ? 'destructive' : 'default'}>
                            {patient.risk}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{patient.name} ({patient.gender}, {patient.age})</TableCell>
                        <TableCell>{patient.alerts}</TableCell>
                        <TableCell>{patient.raf.toFixed(3)}</TableCell>
                        <TableCell className="max-w-xs truncate">{patient.summary}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>

            {/* Right sidebar */}
            <div className="w-1/3 flex flex-col space-y-4 overflow-hidden">
              {/* Schedule */}
              <Card className="flex-1">
                <CardHeader className="p-2">
                  <CardTitle className="text-base">Schedule</CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <ScrollArea className="h-[calc(50vh-100px)]">
                    <div className="space-y-2">
                      {appointments.map((appointment, index) => (
                        <Card key={index} className="p-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-semibold text-sm">{appointment.time}</div>
                              <div className="text-sm">{appointment.patient}</div>
                              <div className="text-xs text-muted-foreground">{appointment.type}</div>
                            </div>
                            <Badge variant="outline">{appointment.status}</Badge>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Assigned to me */}
              <Card className="flex-1">
                <CardHeader className="p-2">
                  <CardTitle className="text-base">Assigned to me</CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <ScrollArea className="h-[calc(50vh-100px)]">
                    <div className="space-y-2">
                      {assignedTasks.map((task, index) => (
                        <Card key={index} className="p-2">
                          <div className="flex items-start space-x-2">
                            <Avatar>
                              <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={task.name} />
                              <AvatarFallback>{task.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <span className="font-semibold text-sm">{task.name}</span>
                                <span className="text-xs text-muted-foreground">{task.time}</span>
                              </div>
                              <p className="text-xs">{task.description}</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeView === 'patients' && (
          <div className="flex-1 p-4 flex space-x-4 overflow-hidden">
            {/* Patient list */}
            <div className="w-full bg-card rounded-lg shadow overflow-hidden flex flex-col">
              <div className="p-2 border-b border-border flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <h2 className="text-base font-semibold">Patient List</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                </div>
              </div>
              <ScrollArea className="flex-1">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10"></TableHead>
                      <TableHead className="w-[200px]">Name</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>RAF</TableHead>
                      <TableHead>Risk</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>AWV Status</TableHead>
                      <TableHead>Billable</TableHead>
                      <TableHead>Cohorts</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patients.map((patient) => (
                      <TableRow key={patient.id} className="cursor-pointer" onClick={() => handlePatientClick(patient)}>
                        <TableCell className="p-2">
                          <Checkbox
                            checked={selectedPatients.includes(patient.id)}
                            onCheckedChange={() => togglePatientSelection(patient.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{patient.name} ({patient.gender}, {patient.age})<br/><span className="text-xs text-muted-foreground">{patient.condition}</span></TableCell>
                        <TableCell>{patient.priority}</TableCell>
                        <TableCell>{patient.raf}</TableCell>
                        <TableCell>
                          <Badge variant={patient.risk === 'Highest' ? 'destructive' : 'default'}>
                            {patient.risk}
                          </Badge>
                        </TableCell>
                        <TableCell>{patient.status}</TableCell>
                        <TableCell>{patient.awvStatus}</TableCell>
                        <TableCell>{patient.billable}</TableCell>
                        <TableCell>
                          {patient.cohorts.map((cohort, index) => (
                            <Badge key={index} variant="outline" className="mr-1 text-xs">
                              {cohort}
                            </Badge>
                          ))}
                        </TableCell>
                        <TableCell>
                          {patient.action && (
                            <Button variant="outline" size="sm">
                              {patient.action}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </div>
        )}

        {selectedPatient && !showAlertDetails && (
          <PatientDetails patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
        )}

        {showAlertDetails && selectedPatient && (
          <PatientAlertDetails 
            patient={selectedPatient} 
            onClose={() => {
              setShowAlertDetails(false)
              setSelectedPatient(null)
            }} 
          />
        )}
      </div>
    </div>
  )
}