

export interface Camera {
  id: number;
  name: string;
  email: string;
  health: {
    cloud: string;
    device: string;
  };
  location: string;
  recorder: string;
  tasks: string;
  status: 'Active' | 'Inactive';
  current_status:string;
  hasWarning:boolean;

}