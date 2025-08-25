"use client";
import React, { useEffect, useState } from "react";
import {
  useGetDataQuery,
  useLazyGetDataByIdQuery,
} from "../../../features/api";
import Modal from "../components/Modal";
import { FaBus, FaCarAlt } from "react-icons/fa";

const Data = () => {
  const { data: routes, isLoading, error } = useGetDataQuery();
  const [dataId, setDataId] = useState(null);
  const [trigger, { data: info }] = useLazyGetDataByIdQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inpSearch, setInpSearch] = useState("");

  useEffect(() => {
    if (dataId) trigger(dataId);
  }, [dataId, trigger]);

  if (isLoading) return <p className="text-gray-500">Загрузка данных...</p>;
  if (error) return <p className="text-red-500">Ошибка при загрузке данных!</p>;
  if (!routes) return <p className="text-gray-500">Данные не найдены</p>;

  return (
    <>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {info && (
          <article>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">
              <FaBus />
              Маршрут №{info.marshrut}
            </h2>
            <div className="space-y-3 text-lg">
              <p>
                <b>ID:</b> {info.id}
              </p>
              <p>
                <b>Начало:</b> {info.from}
              </p>
              <p>
                <b>Конечная точка:</b> {info.to}
              </p>
              <p>
                <b>Время работы:</b> {info.availabilityTime}
              </p>
              <p>
                <b>Вместимость:</b> {info.capacity} чел.
              </p>
            </div>

            {info.cars && info.cars.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <FaCarAlt />
                  Автомобили
                </h3>
                <div className="space-y-4">
                  {info.cars.map((car) => (
                    <div
                      key={car.id}
                      className="border rounded-lg p-4 shadow-sm"
                    >
                      <p>
                        <b>ID:</b> {car.id}
                      </p>
                      <p>
                        <b>Номер машины:</b> {car.carNumber}
                      </p>
                      <p>
                        <b>Водитель:</b> {car.driverName}
                      </p>
                      <p>
                        <b>Рабочее время:</b> {car.availabilityTime}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        )}
      </Modal>

      <section className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-5 items-center justify-between">
          <h1 className="text-3xl font-bold mb-6">Список маршрутов</h1>
          <input
            type="text"
            value={inpSearch}
            onChange={(e) => setInpSearch(e.target.value)}
            placeholder="🔍 Введите номер маршрутки"
            className="w-full md:w-1/3 px-4 py-2 rounded-xl border shadow-sm focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-6">
          {routes.length ? (
            routes
              .filter((r) =>
                r.marshrut.toLowerCase().includes(inpSearch.toLowerCase())
              )
              .map((route) => (
                <article
                  key={route.id}
                  onClick={() => {
                    setDataId(route.id);
                    setIsModalOpen(true);
                  }}
                  className="bg-white shadow-md rounded-xl p-6 border hover:scale-[1.01] transition"
                >
                  <h2 className="text-xl font-semibold mb-3">
                    <FaBus />
                    Маршрут №{route.marshrut}
                  </h2>
                  <p>
                    <b>Начало:</b> {route.from}
                  </p>
                  <p>
                    <b>Конечная точка:</b> {route.to}
                  </p>
                  <p>
                    <b>Время работы:</b> {route.availabilityTime}
                  </p>
                  <p>
                    <b>Вместимость:</b> {route.capacity} чел.
                  </p>

                  {route.cars && route.cars.length > 0 && (
                    <div className="mt-5">
                      <h3 className="text-lg font-medium mb-3">
                        <FaCarAlt />
                        Автомобили:
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {route.cars.map((car) => (
                          <div
                            key={car.id}
                            className="bg-gray-50 border rounded-lg p-4"
                          >
                            <p>
                              <b>Номер машины:</b> {car.carNumber}
                            </p>
                            <p>
                              <b>Водитель:</b> {car.driverName}
                            </p>
                            <p>
                              <b>Рабочее время:</b> {car.availabilityTime}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              ))
          ) : (
            <p>Не найдено маршруток 😕</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Data;
