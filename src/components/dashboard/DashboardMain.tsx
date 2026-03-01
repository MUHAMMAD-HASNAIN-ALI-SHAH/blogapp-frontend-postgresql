import { useEffect } from 'react'
import DashboardSkeletonData from '../skeleton/DashboardSkeletonData';
import useDashboardStore from '../../store/useDashboardStore';
import DashboardData from './DashboardData';
import DashboardSkeletonBlogs from '../skeleton/DashboardSkeletonBlogs';
import DashboardBlogs from './DashboardBlogs';

const DashboardMain = () => {
  const { getMyBlogs, statsLoader, getMyBlogsLoader, getStats } = useDashboardStore();

  useEffect(() => {
    getMyBlogs();
  }, [getMyBlogs]);

  useEffect(() => {
    getStats();
  }, []);

  return (
    <div className="w-full mt-20">
      <div className="w-full md:w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto">
        <div className="w-full">
          {statsLoader ? <DashboardSkeletonData /> : <DashboardData />}
        </div>

        <div className="w-full">
          {getMyBlogsLoader ? <DashboardSkeletonBlogs /> : <DashboardBlogs />}
        </div>
      </div>
    </div>
  );
}

export default DashboardMain
