import About from '@/components/About'
import NotFound from '@/components/NotFound'
import HostsStatus from '@/components/status/HostsStatus'
import HostServicesStatus from '@/components/status/HostServicesStatus'
import ServicesStatus from '@/components/status/ServicesStatus'
import UnhandledServicesStatus from '@/components/status/UnhandledServicesStatus'
import HostHistory from '@/components/status/HostHistory'
import HostStatuses from '@/components/config/HostStatuses'
import ServiceStatuses from '@/components/config/ServiceStatuses'
import ServiceHistory from '@/components/status/ServiceHistory'
import UserList from '@/components/entity/user/UserList'
import UserDetails from '@/components/entity/user/UserDetails'
import GroupList from '@/components/entity/group/GroupList'
import GroupDetails from '@/components/entity/group/GroupDetails'
import CommandList from '@/components/entity/command/CommandList'
import CommandDetails from '@/components/entity/command/CommandDetails'
import HostsList from '@/components/entity/host/HostsList'
import HostByLocation from '@/components/entity/host/HostByLocation'
import HostDetails from '@/components/entity/host/HostDetails'
import ServicesList from '@/components/entity/service/ServicesList'
import ServiceByLocation from '@/components/entity/service/ServiceByLocation'
import ServiceByType from '@/components/entity/service/ServiceByType'
import ServiceDetails from '@/components/entity/service/ServiceDetails'
import ServiceHosts from '@/components/entity/service/ServiceHosts'
import ConfigReloader from '@/components/ConfigReloader'
import TimePeriodList from '@/components/entity/time_period/TimePeriodList'
import TimePeriodDetails from '@/components/entity/time_period/TimePeriodDetails'

const routes = [
  { path: '/', component: UnhandledServicesStatus },
  { path: '/status/hosts', component: HostsStatus },
  { path: '/status/hosts', component: HostsStatus },
  { path: '/status/host/:host', component: HostHistory },
  { path: '/status/host-services/:host', component: HostServicesStatus },
  { path: '/status/services', component: ServicesStatus },
  { path: '/status/service/:host/:service', component: ServiceHistory },
  { path: '/status/unhandled', component: UnhandledServicesStatus },
  { path: '/status/services', component: ServicesStatus },

  { path: '/hosts/location/:location', component: HostByLocation },
  { path: '/hosts/view/:host', component: HostDetails },
  { path: '/hosts', component: HostsList },
  { path: '/hosts/statuses', component: HostStatuses },

  { path: '/services', component: ServicesList },
  { path: '/services/location/:location', component: ServiceByLocation },
  { path: '/services/type/:type', component: ServiceByType },
  { path: '/services/view/:service', component: ServiceDetails },
  { path: '/services/hosts/:service', component: ServiceHosts },
  { path: '/services/statuses', component: ServiceStatuses },

  { path: '/contacts', component: UserList },
  { path: '/contacts/groups', component: GroupList },
  { path: '/contacts/user/:user', component: UserDetails },
  { path: '/contacts/group/:group', component: GroupDetails },

  { path: '/commands', component: CommandList },
  { path: '/commands/view/:command', component: CommandDetails },

  { path: '/time-periods', component: TimePeriodList },
  { path: '/time-periods/view/:period', component: TimePeriodDetails },

  { path: '/config/entities', component: ConfigReloader },

  { path: '/about', component: About },
  { path: '/admin', component: About },

  { path: '*', component: NotFound },

];

export default routes
