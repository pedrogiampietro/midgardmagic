export function Highscores() {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh] mr-3">
      <div className="relative flex max-w-[500px] h-[430px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
        <div className="flex h-fit w-full items-center justify-between rounded-t-2xl bg-white px-4 pb-[20px] pt-4 shadow-2xl shadow-gray-100 dark:!bg-navy-700 dark:shadow-none">
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Highscores
          </h4>
          <button className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
            See all
          </button>
        </div>
        <div className="w-full overflow-x-scroll px-4 md:overflow-x-hidden">
          <table
            role="table"
            className="w-full min-w-[500px] overflow-x-scroll"
          >
            <thead>
              <tr role="row">
                <th colSpan={1} role="columnheader" title="Toggle SortBy">
                  <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                    Name
                  </div>
                </th>
                <th colSpan={1} role="columnheader" title="Toggle SortBy">
                  <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                    Level
                  </div>
                </th>
              </tr>
            </thead>
            <tbody role="rowgroup" className="px-4">
              <tr role="row">
                <td className="py-3 text-sm" role="cell">
                  <div className="flex items-center gap-2">
                    <div className="h-[30px] w-[30px] rounded-full">
                      <img
                        src="https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2244&amp;q=80"
                        className="h-full w-full rounded-full"
                        alt=""
                      />
                    </div>
                    <p className="text-sm font-medium text-navy-700 dark:text-white">
                      @maddison_c21
                    </p>
                  </div>
                </td>
                <td className="py-3 text-sm" role="cell">
                  <p className="text-md font-medium text-gray-600 dark:text-white">
                    9821
                  </p>
                </td>
              </tr>
              <tr role="row">
                <td className="py-3 text-sm" role="cell">
                  <div className="flex items-center gap-2">
                    <div className="h-[30px] w-[30px] rounded-full">
                      <img
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1780&amp;q=80"
                        className="h-full w-full rounded-full"
                        alt=""
                      />
                    </div>
                    <p className="text-sm font-medium text-navy-700 dark:text-white">
                      @karl.will02
                    </p>
                  </div>
                </td>
                <td className="py-3 text-sm" role="cell">
                  <p className="text-md font-medium text-gray-600 dark:text-white">
                    7032
                  </p>
                </td>
              </tr>
              <tr role="row">
                <td className="py-3 text-sm" role="cell">
                  <div className="flex items-center gap-2">
                    <div className="h-[30px] w-[30px] rounded-full">
                      <img
                        src="https://images.unsplash.com/photo-1573766064535-6d5d4e62bf9d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1315&amp;q=80"
                        className="h-full w-full rounded-full"
                        alt=""
                      />
                    </div>
                    <p className="text-sm font-medium text-navy-700 dark:text-white">
                      @andreea.1z
                    </p>
                  </div>
                </td>
                <td className="py-3 text-sm" role="cell">
                  <p className="text-md font-medium text-gray-600 dark:text-white">
                    5204
                  </p>
                </td>
              </tr>
              <tr role="row">
                <td className="py-3 text-sm" role="cell">
                  <div className="flex items-center gap-2">
                    <div className="h-[30px] w-[30px] rounded-full">
                      <img
                        src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1780&amp;q=80"
                        className="h-full w-full rounded-full"
                        alt=""
                      />
                    </div>
                    <p className="text-sm font-medium text-navy-700 dark:text-white">
                      @abraham47.y
                    </p>
                  </div>
                </td>
                <td className="py-3 text-sm" role="cell">
                  <p className="text-md font-medium text-gray-600 dark:text-white">
                    4309
                  </p>
                </td>
              </tr>
              <tr role="row">
                <td className="py-3 text-sm" role="cell">
                  <div className="flex items-center gap-2">
                    <div className="h-[30px] w-[30px] rounded-full">
                      <img
                        src="https://i.ibb.co/7p0d1Cd/Frame-24.png"
                        className="h-full w-full rounded-full"
                        alt=""
                      />
                    </div>
                    <p className="text-sm font-medium text-navy-700 dark:text-white">
                      @simmmple.web
                    </p>
                  </div>
                </td>
                <td className="py-3 text-sm" role="cell">
                  <p className="text-md font-medium text-gray-600 dark:text-white">
                    3871
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
