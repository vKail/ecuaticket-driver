export interface RouteSheetsApiResponse {
  success: boolean;
  message: Message;
  data:    RouteSheet[];
}

export interface RouteSheet {
  id:          number;
  date:        string;
  status:      string;
  mode:        string;
  frequencyId: number;
  busId:       number;
  driverId:    number;
  bus:         Bus;
  driver:      Driver;
  frequency:   Frequency;
  tickets:     any[];
}

export interface Bus {
  id:             number;
  internalNumber: string;
  licensePlate:   string;
  chassisBrand:   string;
  bodyBrand:      string;
  photoUrl:       null;
  isActive:       boolean;
  companyId:      number;
  physicalSeats:  PhysicalSeat[];
}

export interface PhysicalSeat {
  id:        number;
  seatNumber: string;
  row:       number;
  column:    number;
  floor:     number;
  isTaken:   boolean;
  busId:     number;
  seatTypeId: number;
}

export interface Driver {
  id:        number;
  username:  string;
  role:      string;
  isActive:  boolean;
  createdAt: string;
  updatedAt: string;
  companyId: number;
  personId:  number;
}

export interface Frequency {
  id:            number;
  time:          string;
  resolution:    string;
  active:        boolean;
  createdAt:     string;
  companyId:     number;
  originId:      number;
  destinationId: number;
  origin:        Location;
  destination:   Location;
}

export interface Location {
  id:        number;
  name:      string;
  province:  string;
}

export interface Message {
  content:     string[];
  displayable: boolean;
} 